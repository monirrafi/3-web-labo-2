export class Permis {
  Permis_Numéro: string;
  Permis_Date_de_début: string;
  Permis_Date_de_fin: string;
  Gardien_Territoire_ex_villes: string;
  Animal_Type_de_permis: string;
  Animal_Nom: string;

  constructor(
    Permis_Numéro: string,
    Permis_Date_de_début: string,
    Permis_Date_de_fin: string,
    Gardien_Territoire_ex_villes: string,
    Animal_Type_de_permis: string,
    Animal_Nom: string
  ) {
    this.Permis_Numéro = Permis_Numéro;
    this.Permis_Date_de_début = Permis_Date_de_début;
    this.Permis_Date_de_fin = Permis_Date_de_fin;
    this.Gardien_Territoire_ex_villes = Gardien_Territoire_ex_villes;
    this.Animal_Type_de_permis = Animal_Type_de_permis;
    this.Animal_Nom = Animal_Nom;
  }
}
