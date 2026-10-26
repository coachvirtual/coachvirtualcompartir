module.exports = {
  content: ['./index.html', './js/*.js'],
  // Estas clases se construyen con los colores de secciones en main.js.
  safelist: [{
    pattern: /^(text|bg|border)-(indigo|purple|pink|blue|cyan|emerald|amber|green|yellow|red|slate)-(300|400|500|600)(\/(10|20|50|60))?$/,
    variants: ['hover', 'focus', 'group-hover']
  }],
  theme: { extend: {} },
  plugins: []
};
