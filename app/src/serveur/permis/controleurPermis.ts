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
  //connectionLimit: 5

});


//const insererPermis = async (no,debut,fin,ville,typeAnimal,nomAnimal)=> {
const insererPermis = async (strSql:string) =>{
  //no:string,debut:string,fin:string,ville:string,typeAnimal:string,nomAnimal:string)=> {
  let conn;
try {
 conn = await pool.getConnection();
//let strSql = "INSERT INTO permis value ('" + no + "','"+ debut + "','"+ fin + "','"+ ville + "','"+ typeAnimal + "','"+ nomAnimal + "')";
//let strSql = "INSERT INTO permis value ('224','debut' ,'fin' ,'ville' ,'typeAnimal' ,'nomAnimal')";
let res = await conn.query(strSql);
console.log('data inserted'); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
} catch (err) {
throw err;
} finally {
if (conn) return conn.end();
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
  const chargerTablePermis = async () =>{
  let listePermis: Array<Permis> = await chargerFichierJsonEnObjetJson();
  for (let unAnimal of listePermis) {
    let strSql:string = "INSERT INTO permis value ('" + unAnimal.Permis_Numéro + 
    "','"+ unAnimal.Permis_Date_de_début +
     "','"+ unAnimal.Permis_Date_de_fin + "','"+ unAnimal.Gardien_Territoire_ex_villes + 
     "','"+ unAnimal.Animal_Type_de_permis + "','"+ unAnimal.Animal_Nom + "'";
     //"insert into permis value ('16987','2020-10-01','2023-10-01','Montreal','Chien','kiko'";
     insererPermis(strSql);
  }
  
  }
  

const exucteRequetePermis = async (strSql:string): Promise<Array<Permis>> =>{
  //let listePermis: Array<Permis> = [];
  let conn;
  try {
   conn = await pool.getConnection();
   let res = await conn.query(strSql);
   //listePermis = JSON.parse(res);
   return res;
  } catch (err) {
  throw err;
  } finally {
   if (conn) //return conn.end();
   conn?.end();
  }
  }
  

export const listerTout = async (req: Request): Promise<object> => {
  return exucteRequetePermis("select * from permis");
};

export const listeTriee = async (req: Request): Promise<object> => {
  
  let listePermis: Array<Permis> = await exucteRequetePermis("select * from permis");
  const listTrier = listePermis.sort((a:Permis, b:Permis):any=>{
    if(a.Gardien_Territoire_ex_villes > b.Gardien_Territoire_ex_villes){
        return 1;
    }else if(a.Gardien_Territoire_ex_villes < b.Gardien_Territoire_ex_villes){
        return -1;
    } else{
        return 0;
    }
  });
  
 return listTrier;
};


export const listePermisDeType = async (req: Request): Promise<object> => {
  
  let typeA = req.body.typeAnimal;
  let strSql = "select * from permis where type_animal ='" + typeA + "'";  
  let listePermisDeType: Array<Permis> = await exucteRequetePermis(strSql);
  return listePermisDeType;
};

export const listePermisDeVille = async (req: Request): Promise<object> => {

  let villeA = req.body.villeAnimal;
  let strSql = "select * from permis where ville ='" + villeA + "'";  
  let listePermisDeVille: Array<Permis> = await exucteRequetePermis(strSql);
  return listePermisDeVille;
};

export const listerPermisFini = async (req: Request): Promise<object> => {
  let anneef = req.body.anneeF;
  let moisf = req.body.moisF;
  let date =  anneef + "-"+ moisf + "%";
  let strSql = "select * from permis where date_fin like '" + date +"'";  
  let listerPermisFini: Array<Permis> = await exucteRequetePermis(strSql);
  return listerPermisFini;
};

