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

    res.redirect('/');
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota GET para atualizar o nome de um item
router.get('/atualizar', async (req: Request, res: Response) => {
  try {
    const { identificador, name } = req.query;

    // Verifica se os parâmetros estão presentes
    if (!identificador || !name) {
      return res.status(400).send('Bad Request: Missing parameters.');
    }

    // Atualiza o nome do item no banco de dados
    await connection.query(
      'UPDATE items SET name = ? WHERE id = ?',
      [name, identificador]
    );

    res.send('Item updated successfully.');
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota GET para excluir um item
router.get('/excluir', async (req: Request, res: Response) => {
  try {
    const { identificador } = req.query;

    // Verifica se o parâmetro está presente
    if (!identificador) {
      return res.status(400).send('Bad Request: Missing parameter.');
    }

    // Exclui o item do banco de dados
    await connection.query(
      'DELETE FROM items WHERE id = ?',
      [identificador]
    );

    res.send('Item deleted successfully.');
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;