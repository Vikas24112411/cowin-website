const xhr = new XMLHttpRequest()
const state_url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
xhr.open('GET', state_url)
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const response = xhr.responseText
    var responseObject = JSON.parse(response)
    var state_sel = document.querySelector("#state_html");
    for (let i = 0; i < responseObject.states.length; i++) {
      var opt = document.createElement("option");
      opt.value = `${responseObject.states[i].state_id}`
      opt.text = `${responseObject.states[i].state_name}`
      //opt.text = "Option: "+responseObject.states[i];
      // console.log(opt.value)
      // console.log(opt.text)
      state_sel.add(opt, null);
    }



    document.querySelector("#state_html").addEventListener("change", () => {
      // console.log(e)
      var tem = document.querySelector("select")
      console.log(document.querySelector("select").value)
      var t = document.querySelector("select").value
      console.log(tem.options[tem.selectedIndex].text)



      const dist_xhr = new XMLHttpRequest()
      const dist_url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + t
      dist_xhr.open('GET', dist_url)
      dist_xhr.onreadystatechange = () => {
        if (dist_xhr.readyState == 4 && dist_xhr.status == 200) {
          const dist_response = dist_xhr.responseText
          var dist_responseObject = JSON.parse(dist_response)
          var dist_sel = document.querySelector("#dist_html");
          while (dist_sel.options.length > 1) 
          {
            dist_sel.remove(1);
          }
          for (let i = 0; i < dist_responseObject.districts.length; i++) {
            var dist_opt = document.createElement("option");
            dist_opt.value = `${dist_responseObject.districts[i].district_id}`
            dist_opt.text = `${dist_responseObject.districts[i].district_name}`
            dist_sel.add(dist_opt, null);
          }



          // document.querySelector("#dist_html").addEventListener("change", getDistricts);
        }
      }
      dist_xhr.send()

    });
  }
}
xhr.send()

document.querySelector("#date_html").addEventListener("change", (e) => {
  console.log(e.target.value)
});
