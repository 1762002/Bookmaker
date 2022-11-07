
var siteName = document.getElementById("siteName") ;
var siteUrl = document.getElementById("siteUrl") ;
var submitBtn = document.getElementById("submitBtn") ;

var search = document.getElementById("search") ;
var alert = document.getElementById("alert") ;

var inputs = document.getElementsByClassName("form-control") ;

var sitesTable = document.getElementById("sitesTable") ;

var sites = [] ;

var currentIndex = 0 ;



if(JSON.parse ( localStorage.getItem("sitesList") ) != null) {
    sites = JSON.parse ( localStorage.getItem("sitesList") ) ;
    displaySites() ;
}


submitBtn.addEventListener("click",function(){
    if (submitBtn.innerHTML == "Add Site") {
        getData () ;
        submitBtn.setAttribute("disabled","true") ;
    }
    else{
        submitBtn.removeAttribute("disabled") ;
        update () ;
        submitBtn.setAttribute("disabled","true") ;
    }
    
    displaySites () ;
    clear () ;
})

function getData () {
    var site = {
        Name : siteName.value,
        url : siteUrl.value
    }
    sites.push(site) ;
    localStorage.setItem("sitesList", JSON.stringify(sites)) ;
}

function displaySites () {
    var content = `` ;
    for (var i = 0 ; i<sites.length ; i++) {
        content +=  ` <tr>
        <td><h2>${sites[i].Name}</h2></td>
        <td> <button type="button" class="btn btn-primary"> <a href="${sites[i].url}" target="_blank" >View</a> </button> </td>
        <td> <button onclick="deleteSite(${i})" type="button" class="btn btn-danger">Delete</button> </td>
        <td> <button onclick="getSiteInfo(${i})" type="button" class="btn btn-warning">Update</button> </td>
      </tr>`
    }
  sitesTable.innerHTML = content ;
}

function clear () {
    for (var i = 0 ; i<inputs.length ; i++) {
        inputs[i].value = "" ;
    }
}

function deleteSite (index) {
    sites.splice(index,1) ;
    displaySites () ;
    localStorage.setItem("sitesList", JSON.stringify(sites)) ;
}

function getSiteInfo (index) {
    currentIndex = index ;
    siteName.value = sites[index].Name ;
    siteUrl.value = sites[index].url ;
    submitBtn.innerHTML = "Update" ;
}

function update () {
    var site = {
        Name : siteName.value ,
        Url : siteUrl.value
    }
    sites[currentIndex] = site ;
    submitBtn.innerHTML = "Add Site" ;
    localStorage.setItem("sitesList", JSON.stringify(sites)) ;
}

search.addEventListener("keyup",function(){
        for (i=0 ; i<sites.length ; i++) {
            
            var content = `` ;
            for (var i = 0 ; i<sites.length ; i++) {
                if(sites[i].Name.toLowerCase().includes(search.value.toLowerCase())) {
                    content +=  ` <tr>
                    <td><h2>${sites[i].Name}</h2></td>
                    <td> <button type="button" class="btn btn-primary"> <a href="${sites[i].url}" target="_blank" >View</a> </button> </td>
                    <td> <button onclick="deleteSite(${i})" type="button" class="btn btn-danger">Delete</button> </td>
                    <td> <button onclick="getSiteInfo(${i})" type="button" class="btn btn-warning">Update</button> </td>
                  </tr>`
                }
            }
          sitesTable.innerHTML = content ;
      
    }

})


var nameRejex = /^([a-z]|[A-Z]|[0-9]){3,10}$/  ;

siteName.onkeyup = function () {
        if(nameRejex.test(siteName.value)) {
            submitBtn.removeAttribute("disabled") ;
            siteName.classList.add("is-valid") ;
            siteName.classList.remove("is-invalid") ;
            alert.classList.add("d-none") ;
        }
        else {
            submitBtn.setAttribute("disabled","true") ;
            siteName.classList.add("is-invalid") ;
            siteName.classList.remove("is-valid") ;
            alert.classList.remove("d-none") ;
        }
    } 
    