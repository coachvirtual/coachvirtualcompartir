const fs = require('node:fs');
const path = require('node:path');
const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { doc, getDoc, getDocs, collection, updateDoc, setDoc, deleteDoc, increment } = require('firebase/firestore');

(async () => {
  const environment = await initializeTestEnvironment({
    projectId:'demo-coach-security',
    firestore:{ rules:fs.readFileSync(path.join(__dirname,'../firestore.rules'),'utf8') }
  });
  const passed = [];
  try {
    await environment.clearFirestore();
    await environment.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(),'estadisticas/contadorVisitas'),{ total:100 });
      await setDoc(doc(context.firestore(),'privado/prueba'),{ secret:true });
    });
    const db = environment.unauthenticatedContext().firestore();
    const counter = doc(db,'estadisticas/contadorVisitas');
    await assertSucceeds(getDoc(counter));
    await assertSucceeds(updateDoc(counter,{ total:increment(1) }));
    passed.push('Public get and atomic increment +1 allowed');
    for (const total of [0, -1, 103, 1.5, '102', null]) {
      await assertFails(updateDoc(counter,{ total }));
    }
    passed.push('Resets, decrements, larger jumps and invalid types rejected');
    await assertFails(updateDoc(counter,{ total:102, injected:'field' }));
    await assertFails(deleteDoc(counter));
    await assertFails(setDoc(doc(db,'estadisticas/otro'),{ total:1 }));
    await assertFails(getDocs(collection(db,'estadisticas')));
    await assertFails(getDoc(doc(db,'privado/prueba')));
    await assertFails(setDoc(doc(db,'privado/prueba'),{ secret:false }));
    passed.push('Extra fields, deletes, other documents and collection listing rejected');
    await environment.withSecurityRulesDisabled(context => deleteDoc(doc(context.firestore(),'estadisticas/contadorVisitas')));
    await assertFails(setDoc(counter,{ total:1 }));
    passed.push('Clients cannot recreate a missing counter');
    fs.writeFileSync(path.join(__dirname,'firestore-rules-results.json'),JSON.stringify({ passed, note:'App Check enforcement is configured in Firebase, not evaluated by the rules emulator.' },null,2));
    console.log(JSON.stringify({ passed },null,2));
  } finally {
    await environment.cleanup();
  }
})().catch(e => { console.error(e); process.exitCode=1; });
