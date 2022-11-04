import { Request } from "express";
import path from "path";
import { open } from "node:fs/promises";
import { Permis } from "./permis";
import { createPool } from 'mariadb';

const pool = createPool({
  host: 'localhost', 
  user:'root', 
  password: '',
  database:'bdpermis',
  connectionLimit: 5

});
//const insererPermis = async (no,debut,fin,ville,typeAnimal,nomAnimal)=> {
const insererPermis = async (no:string,debut:string,fin:string,ville:string,typeAnimal:string,nomAnimal:string)=> {

try {
let conn = await pool.getConnection();
let strSql = "INSERT INTO permis value ('" + no + "','"+ debut + "','"+ fin + "','"+ ville + "','"+ typeAnimal + "','"+ nomAnimal + "')";
//let strSql = "INSERT INTO permis value ('224','debut' ,'fin' ,'ville' ,'typeAnimal' ,'nomAnimal')";
let res = await conn.query(strSql);
console.log('data inserted'); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
} catch (err) {
throw err;
} finally {
//if (conn) return conn.end();
}

}

const chargerFichierJsonEnObjetJson = async (): Promise<Array<Permis>> => {
//let auteur = req.body.auteur;
let cheminFichier = path.join(__dirname, "../donnees/permisAnimaux.json");
let listePermis: Array<Permis> = [];
try {
 let fichier = await open(cheminFichier);
 const contenu: string = await fichier.readFile("utf-8");
 fichier.close();
    
 listePermis = JSON.parse(contenu); //Convertir un string en JSON objet
} catch (e: any) { 
} finally {
 return listePermis;
}
};

export const chargerTablePermis = async () =>{
let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
for (let unAnimal of listePermis) {
 insererPermis(unAnimal.Permis_Numéro,unAnimal.Permis_Date_de_début,unAnimal.Permis_Date_de_fin,
   unAnimal.Gardien_Territoire_ex_villes,
   unAnimal.Animal_Type_de_permis,unAnimal.Animal_Nom);
}

}

export const listeTriee = async (req: Request): Promise<object> => {
  let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
 
  const listTrier = listePermis.sort((a:Permis, b:Permis):any=>{
  if(a.Animal_Type_de_permis > b.Animal_Type_de_permis){
      return 1;
  }else if(a.Animal_Type_de_permis < b.Animal_Type_de_permis){
      return -1;
  } else{
      return 0;
  }
})
  return listTrier;
};

export const listePermisDeType = async (req: Request): Promise<object> => {
  let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
 
  let typeA = req.body.typeAnimal;

  let listePermisDeType: Array<Permis> = [];
  
  for (let unAnimal of listePermis) {
    if (unAnimal.Animal_Type_de_permis == typeA) {
      listePermisDeType.push(unAnimal);
    }
  }
  return listePermisDeType;
};

export const listePermisDeVille = async (req: Request): Promise<object> => {
  let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
 
  let villeA = req.body.villeAnimal;

  let listePermisDeVille: Array<Permis> = [];
  
  for (let unAnimal of listePermis) {
    if (unAnimal.Gardien_Territoire_ex_villes == villeA) {
      listePermisDeVille.push(unAnimal);
    }
  }
  return listePermisDeVille;
};

export const listerPermisFini = async (req: Request): Promise<object> => {
  let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
  let anneef = req.body.anneeF;
  let moisf = req.body.moisF;
  let listerPermisFini: Array<Permis> = [];

  for (let unPermis of listePermis) {
     let date: string[] = unPermis.Permis_Date_de_fin.split("-");
     let anFin = date[0];
     let moisFin = date[1];  
    if (anFin == anneef && moisFin == moisf) {
      listerPermisFini.push(unPermis);
    }
  }
  return listerPermisFini;
};

