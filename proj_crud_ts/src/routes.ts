import { Router, Request, Response } from 'express';
import connection from './db'; // Importe a conexão

const router = Router();

// Rota para listar itens
router.get('/items', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT * FROM items');
    res.render('items', { items: rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota para adicionar um item
router.post('/items', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Insere o item no banco de dados
    await connection.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name || null, description || null] // Usa null se o nome ou descrição não forem fornecidos
    );

    res.redirect('/'); // Redireciona para a página inicial após a inserção
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
