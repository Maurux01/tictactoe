/* Fondo con gradiente rosado */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4); /* Degradado rosado */
    color: #333;
}

h1 {
    color: #fff; /* Texto blanco para contrastar con el fondo */
    margin-bottom: 20px;
}

#board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 5px;
    justify-content: center;
    margin: 20px auto;
}

.cell {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.cell:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
}

.cell.taken {
    cursor: not-allowed;
}

#status {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #fff; /* Texto blanco para contrastar con el fondo */
}

#restart {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #ff6f61; /* Botón en tono rosado */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#restart:hover {
    background-color: #ff3b2f; /* Botón más oscuro al pasar el mouse */
}

.winner {
    background-color: #d4edda;
    color: #155724;
}
