/*
let compareTo = (unAnimal, unAutre) => {
    if(unAnimal.Animal_Type_de_permis > unAutre.Animal_Type_de_permis){
        return 1;
    }else if(unAnimal.Animal_Type_de_permis < unAutre.Animal_Type_de_permis){
        return -1;
    } else{
        return 0;
    }
};*/
const listerTout = () => {
    $.ajax({
        url:"/permis",
        type:"GET",
        data:{},
        dataType:'json',  // json, xml, text
        async: true, // false pour se  mettre en mode synchrone.
        success: (reponse) => {
            //alert(reponse);
             lister(reponse); // Tri par Categorie
        },
        fail: (e) => {
            alert(`Gros probléme : ${e.message}`);
        }
    });
}


const listerToutSelonTypeAnimal = () => {
    $.ajax({
        url:"/listeTriee",
        type:"GET",
        data:{},
        dataType:'json',  // json, xml, text
        async: true, // false pour se  mettre en mode synchrone.
        success: (reponse) => {
            //alert(reponse);
             lister(reponse); // Tri par Categorie
        },
        fail: (e) => {
            alert(`Gros probléme : ${e.message}`);
        }
    });
}

let listerParType = () => {
    let typeA = document.getElementById('typea').value;

    $.ajax({
        url:"/listerParType",
        type:"POST",
        data:{'typeAnimal':typeA},
        dataType:'json',  // json, xml, text
        async: true, // false pour se  mettre en mode synchrone.
        success: (listePermisDeType) => {
            //alert(listeLivresDeAuteur);
            console.log(listePermisDeType);
            lister(listePermisDeType);
        },
        fail: (e) => {
            alert(`Gros probléme : ${e.message}`);
        }
    });
}

let listerParVille = () => {
    let villeA = document.getElementById('villea').value;

    $.ajax({
        url:"/listerParVille",
        type:"POST",
        data:{'villeAnimal':villeA},
        dataType:'json',  // json, xml, text
        async: true, // false pour se  mettre en mode synchrone.
        success: (listePermisDeVille) => {
            //alert(listeLivresDeAuteur);
            lister(listePermisDeVille);
        },
        fail: (e) => {
            alert(`Gros probléme : ${e.message}`);
        }
    });
}

let listerPermisFin = () => {
    let anf = document.getElementById('anneeF').value;
    let moisf = document.getElementById('moisF').value;

  //  if(and <= anf){
        $.ajax({
            url:"/listerPermisExpire",
            type:"POST",
            data:{'anneeF':anf, 'moisF':moisf},
            dataType:'json',  // json, xml, text
            async: true, // false pour se  mettre en mode synchrone.
            success: (listePermisFini) => {
                //alert(listeLivresEntreDeuxAnnees);
                lister(listePermisFini);
            },
            fail: (e) => {
                alert(`Gros probléme : ${e.message}`);
            }
        });
  //  } else {
   //     alert("L'année du début doit être <= à l'année de la fin");
 //   }
}


