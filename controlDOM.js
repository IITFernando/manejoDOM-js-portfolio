const usuario=
{
    id:"",
    nombre:"",
    apellido:"",
    documento:""
}

let isValido=false
let isEditando=false

function accionUsuario(event)
{
    event.preventDefault()
    validarCampos()
    if (isValido)
    {
        formatearCampos()
        if (!isEditando)
            agregarUsuario()
        else
            editarUsuario()
        limpiarObjeto()
        limpiarCampos()
        
    }
}

function agregarUsuario()
{
    const id=new Date().getTime()
    const inpNombre=document.getElementById("input-nombre").value
    const primerCampo=document.getElementById("input-nombre")
    const inpApellido=document.getElementById("input-apellido").value
    const inpDocumento=document.getElementById("input-documento").value

    const tBody=document.querySelector("tbody")
    //Armado de una nueva fila
        const tr=document.createElement("tr")
            //A la fila que crea la identifica con un id igual al creado
            tr.setAttribute("id",id)
        const thId=document.createElement("th")
            thId.textContent=id
        const thNombre=document.createElement("th")
            thNombre.textContent=inpNombre
        const thApellido=document.createElement("th")
            thApellido.textContent=inpApellido
        const thDocumento=document.createElement("th")
            thDocumento.textContent=inpDocumento
        btnEditar=document.createElement("button")
            btnEditar.classList.add("btn","btn-editar")
            btnEditar.textContent="Editar"
            btnEditar.onclick=function()
            {
                isEditando=true
                usuario.id=thId.textContent                
                usuario.nombre=thNombre.textContent                
                usuario.apellido=thApellido.textContent                
                usuario.documento=thDocumento.textContent                
                document.getElementById("input-nombre").value=usuario.nombre
                document.getElementById("input-apellido").value=usuario.apellido
                document.getElementById("input-documento").value=usuario.documento
                //Cambia el texto de btnAgregar
                document.getElementById("btn-agregar-actualizar").value="Guardar edición"
                document.getElementById("btn-agregar-actualizar").classList.add("btn-editar")
                document.getElementById("btn-agregar-actualizar").classList.remove("btn-crear")
            }
        btnBorrar=document.createElement("button")
            btnBorrar.textContent="Borrar 🗑"
            btnBorrar.classList.add("btn", "btn-borrar")
            btnBorrar.onclick=function()
            {
                tr.remove()
            }
        
        tr.appendChild(thId)
        tr.appendChild(thNombre)
        tr.appendChild(thApellido)
        tr.appendChild(thDocumento)
        tr.appendChild(btnEditar)
        tr.appendChild(btnBorrar)

    tBody.appendChild(tr)
    primerCampo.focus()
}

function limpiarObjeto()
{
    usuario.id=""
    usuario.nombre=""
    usuario.apellido=""
    usuario.documento=""
}

function editarUsuario()
{
    const trId=document.getElementById(usuario.id)
    trId.childNodes[1].textContent=document.getElementById("input-nombre").value
    trId.childNodes[2].textContent=document.getElementById("input-apellido").value
    trId.childNodes[3].textContent=document.getElementById("input-documento").value
    const btnEditar=document.getElementById("btn-agregar-actualizar")
        btnEditar.value="Guardar usuario"
        btnEditar.classList.add("btn-crear")
        btnEditar.classList.remove("btn-editar")
}

function limpiarCampos()
{
    document.getElementById("input-nombre").value=""
    document.getElementById("input-apellido").value=""
    document.getElementById("input-documento").value=""
    isValido=false
    isEditando=false
}

function formatearCampos()
{
    document.getElementById("input-nombre").value=letraCapital(document.getElementById("input-nombre").value)
    document.getElementById("input-apellido").value=document.getElementById("input-apellido").value.toUpperCase()
    document.getElementById("input-documento").value=ProperCase(document.getElementById("input-documento").value)
}

function generarPDF(event)
{
    event.preventDefault()
    const tBody=document.querySelector("tbody")
    if(tBody.childElementCount===0)
    {
        swal("Error de uso","Tabla vacía, no puede\n exportarse a PDF","error",
            {
                buttons:false,
                timer:2000,
            }
            )
        return
    }

    const strPDF=recorrerTabla()
    const docPDF=new jspdf.jsPDF()
    docPDF.text(strPDF, 10,10)
    docPDF.save("ListaDeUsuarios.PDF")
}

function letraCapital(pTexto)
{
    let texto=pTexto
    let primeraLetra=texto[0].toUpperCase()
    let resto=""
    let huboBlanco=false    
    //Busca blancos para hacer ProperCase
    for (const caracter of texto.slice(1))
    {
        if (huboBlanco)
        {
            huboBlanco=false
            resto+=caracter.toUpperCase()
        }
        else
            resto+=caracter.toLowerCase()

        if(caracter==" ")
            huboBlanco=true
    }
    return primeraLetra+resto
}

//otra version de letra capital
function ProperCase(pTexto)
{
    palabras=pTexto.split(" ")
    palabras.forEach((palabra, idx, array) =>
        {
            primeraLetra=palabra[0].toUpperCase()
            otrasLetras=palabra.slice(1).toLowerCase()
            array[idx]=primeraLetra+otrasLetras
        });
    return palabras.join(" ")

}

function recorrerTabla()
{
    let strRegistros=""
    const table=document.getElementById("table-usuarios")
    for (let f=1; f<table.rows.length;f++)
    {
        strRegistros+="\n"
        for (c=0; c<table.rows[f].cells.length;c++)
        {
            let strCol=table.rows[f].cells[c].innerText
            if (c==0)
                strRegistros+=`${strCol}`
            else
                strRegistros+=` - ${strCol}`
        }
    }
    return strRegistros
}

function validarCampos()
{
    const inpNombre=document.getElementById("input-nombre").value
    const inpApellido=document.getElementById("input-apellido").value
    const inpDocumento=document.getElementById("input-documento").value
    isValido=true

    if (inpNombre==="")
    {
        swal("Error de uso","Por favor llenar todos los campos","error",
            {
                buttons:false,
                timer:1500,
            }
            )
        let elementoVacio=document.getElementById("input-nombre")
        elementoVacio.focus()
        isValido=false
        return
    }
    if (inpApellido==="")
    {
        let elementoVacio=document.getElementById("input-apellido")
        swal("Error de uso","Por favor llenar todos los campos","error",
            {
                buttons:false,
                timer:1500,
            }
            )
        elementoVacio.focus()
        isValido=false
        return
    }
    if (inpDocumento==="")
    {
        let elementoVacio=document.getElementById("input-documento")
        swal("Error de uso","Por favor llenar todos los campos","error",
            {
                buttons:false,
                timer:1500,
            }
            )
        elementoVacio.focus()
        isValido=false
        return
    }
}