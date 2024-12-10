const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();
app.use(cors());

app.get('/points', async (req, res) => {
  try {
    const { cedula } = req.query;
    // Fetch the webpage content
    const response = await axios.get(`https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=${cedula}&ps_placa=`);
    
    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);
    
    // Extract the points value
    const points = $('td.titulo1[width="30"]').text().trim();
    
    // Send the response
    res.json({
      points: parseInt(points),
      success: true
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false
    });
  }
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});