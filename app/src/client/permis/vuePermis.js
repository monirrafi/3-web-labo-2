const construireEntetesPermis = () => {
    const entete = `
        <table class="table table-sm table-dark">
            <thead>
                <tr>
                <th class="table-info" scope="col">Numero Permis</th>
                <th  class="table-info" scope="col">Date Debut</th>
                <th  class="table-info" scope="col">Date Fin</th>
                <th  class="table-info" scope="col">Ville</th>
                <th  class="table-info" scope="col">Type Animal</th>
                <th  class="table-info" scope="col">Nom Animal</th>
                </tr>
            </thead>
            <tbody>
    `;
    return entete;
}
const construirePermis = (unAnimal) =>{
    let tr=`<tr>
        <th>${unAnimal.no_permis}</th>
        <td>${unAnimal.date_debut}</td>
        <td>${unAnimal.date_fin}</td>
        <td>${unAnimal.ville}</td>
        <td>${unAnimal.type_animal}</td>
        <td>${unAnimal.nom_animal}</td>
    </tr>`;
    return tr;
}

const lister = (listePermis) => {
    
    if(listePermis.length == 0 ){
        document.getElementsByClassName('container')[0].innerHTML = `<h3> Element cherché est introuvable </h3>`;
    }else{
        let resultat = construireEntetesPermis();
        for(let unAnimal of listePermis){
            resultat += construirePermis(unAnimal);
        }
        resultat += "</tbody></table>";

        document.getElementsByClassName('container')[0].innerHTML = resultat;

    }
}

let formType = () => {
    let rep = `
    <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
            <label for="typea" class="form-label">Type Animal</label>
            <input type="text"   class="form-outline w-25"  class="form-control" id="typea" name="typea" value="" required>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="button" onClick="listerParType();">Envoyer</button>
        </div>
    </form>
`;
 document.getElementsByClassName('container')[0].innerHTML = rep;
}

let formVille = () => {
    let rep = `
    <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
            <label for="villea" class="form-label">ville</label>
            <input type="text"   class="form-outline w-50" class="form-control" id="villea" name="villea" value="" required>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="button" onClick="listerParVille();">Envoyer</button>
        </div>
    </form>
`;
 document.getElementsByClassName('container')[0].innerHTML = rep;
}

let formDateFin = () => {
    let rep = `
    <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
            <label for="anneeF" class="form-label">Année</label>
            <input type="text"   class="form-outline w-25" class="form-control" id="anneeF" name="annneeF" value="" required>
            <label for="moisF" class="form-label">Mois</label>
            <input type="text"   class="form-outline w-25" class="form-control" id="moisF" name="moisF" value="" required>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="button" onClick="listerPermisFin();">Envoyer</button>
        </div>
    </form>
`;
 document.getElementsByClassName('container')[0].innerHTML = rep;
}


