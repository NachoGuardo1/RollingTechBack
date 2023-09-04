const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Producto = require("../models/productos");

const { validationResult } = require("express-validator");

//el Get es para obtejer los datos de la BD
const productosGet = async (req = request, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    mensaje: "Get productos ",
    total,
    productos,
  });
};

//el post es para guardar los datos en la BD
const productosPost = async (req = request, res = response) => {
  //recibir el cuerpo de la peticion
  //const nombre = req.body.nombre.toUpperCase();
  //const descrip = req.body.descrip.toUpperCase();
  const nombre = req.body.nombre;
  const descrip = req.body.descrip;
  const precio = req.body.precio;
  const categoria = req.body.categoria;
  const img = req.body.img;

  //generar la data que vamos a guardar
  const data = {
    nombre,
    descrip,
    precio,
    categoria,
    img,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  //guardar en la BD
  await producto.save();

  res.json({
    producto,
    messaje: "Producto creado exitosamente",
  });
};

//el Put nos permite leer o actualizar los datos de laBD
const productoPut = async (req = request, res = response) => {
  //tenemos q obtener el id para poder actualizar- lo obtendremos de req.param
  const { id } = req.params;
  //desestructuramos los datos q nos mandan del front
  const { nombre, descrip, precio, categoria, img, ...resto } = req.body;
  resto.nombre = nombre;
  resto.descrip = descrip;
  resto.precio = precio;
  resto.categoria = categoria;
  resto.img = img;

  //buscar el producto en la BD y actualizar
  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    mensaje: "Producto actualizado",
    producto,
  });
};

const productoDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const productoAutenticado = req.producto;
  //le cambiamos el estado a false
  const producto = await Producto.findById(id);

  if (!producto.estado) {
    return res.json({
      msg: "El producto ya se encuentra en estado Inactivo.",
    });
  }

  const productoInactivado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    mensaje: "Producto modificado. Se cambio a estado INACTIVO",
    productoInactivado,
    productoAutenticado,
  });
};

module.exports = {
  productosGet,
  productosPost,
  productoPut,
  productoDelete,
};
