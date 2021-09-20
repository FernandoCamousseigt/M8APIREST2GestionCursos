//similar a ppt

const {Pool} = require('pg');

const moment=require('moment');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    port: 5432,
    database: "cursos",
    host: "localhost"
});

async function insertarCurso(datos) {
    const consulta = {
        text: ` INSERT INTO cursos(nombre,nivel,fecha,duracion) values($1,$2,$3,$4) RETURNING *;`,
        values: datos
    }
    try {
        const result = await pool.query(consulta)      
        return result.rows
    } catch (e) {
        console.log(error)
        return e.code
    }

}
async function consultarCursos() {

    try {
        const result = await pool.query(`SELECT * FROM cursos order by id asc`)
        let filas = result.rows
        filas.forEach(element => {
            let fecha = element.fecha;
            element.fecha = moment(fecha).format('YYYY-MM-DD')
        });
        return result.rows

    } catch (error) {
        console.log(error)
        return error
    }
}

async function editCurso(datos) {

    const consulta = {
        text: `UPDATE cursos SET nombre=$1,nivel=$2,fecha=$3,duracion=$4 where nombre=$1 RETURNING *;`,
        values: [datos[0], Number(datos[1]), datos[2], Number(datos[3])]

    }
    try {
        const result = (await pool.query(consulta))
        return result.rows

    } catch (error) {
        console.log(error)
        return error
    }
}
async function deleteCurso(nombre) {  
    try {
        const result = await pool.query(`DELETE FROM cursos where nombre='${nombre}'`)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    insertarCurso,
    consultarCursos,
    editCurso,
    deleteCurso
}