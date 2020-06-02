
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    fetch(url)
        .then(res => res.json())
        .then(data => {

            for (const state of data) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`

    const ufID = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (const city of data) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
        })

    citySelect.disabled = false

}

function getChoosedCityAndUF(event) {
    const choosedState = document.querySelector("input[name=state]")
    const choosedCity = document.querySelector("input[name=city]")

    const cityID = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityID}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            choosedCity.value = data.nome
            choosedState.value = data.microrregiao.mesorregiao.UF.nome
        })  
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
    .querySelector("select[name=city]")
    .addEventListener("change", getChoosedCityAndUF )