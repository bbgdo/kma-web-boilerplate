const express = require('express');
const path = require('path');
const sass = require('sass');

const app = express();
// app.use(compression());

app.get(/\.scss$/, (req, res) => {
  try {
    const requested = req.path.replace(/^\/+/, '');
    const filePath = path.join(__dirname, 'src', requested);

    const result = sass.compile(filePath, {
      style: 'expanded',
      loadPaths: [
        path.dirname(filePath),
        path.join(__dirname, 'src', 'style'),
        path.join(__dirname, 'src'),
      ],
      sourceMap: false,
    });

    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    return res.status(200).send(result.css);
  } catch (e) {
    return res.status(404).send('/* SCSS not found or failed to compile */');
  }
});

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3001, () => console.log('Example app listening on port 3001!'));;
