import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import connection from './db'; // Importe a conexão

const app = express();
const port = 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json()); // Para processar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para processar dados de formulários

// Rotas
app.use('/api', routes);

// Página inicial para exibir itens
app.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM items');
    res.render('items', { items: rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
