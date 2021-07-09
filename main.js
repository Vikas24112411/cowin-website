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
      state_sel.add(opt, null);
    }

    document.querySelector("#state_html").addEventListener("change", () => {
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
          while (dist_sel.options.length > 1) {
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

function toggle() {
  var xx = document.getElementById("Myid");
  xx.style.display = "none";
}
function toggleOn() {
  var xx = document.getElementById("Myid");
  // xx.style.display = "block";
  var state_ = document.getElementById("state_html");
  var dist_ = document.getElementById("dist_html");
  var date_ = document.getElementById("date_html");
  var h = date_.value
  // console.log(state_.value)
  // console.log(dist_.value)
  // console.log(date_.value)
  // console.log(typeof(date_.value))
  if (state_.value === "Select state" || dist_.value === "Select District" || date_.value === "") {
    xx.style.display = "none";
    console.log(state_.value === "Select state")
    console.log(dist_.value === "Select District")
    console.log(date_.value === "")
    console.log(h.substr(8, 2) + "-" + h.substr(5, 2) + "-" + h.substr(0, 4))
  } else {
    xx.style.display = "block";
  }
  var third_url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + dist_.value + "&date=" + h.substr(8, 2) + "-" + h.substr(5, 2) + "-" + h.substr(0, 4);
  console.log(third_url)
  const last_xhr = new XMLHttpRequest()
  last_xhr.open('GET', third_url)
  last_xhr.onreadystatechange = () => {
    if (last_xhr.readyState == 4 && last_xhr.status == 200) {
      var last_resp = last_xhr.responseText
      last_responseOb = JSON.parse(last_resp)
      // var opt = document.createElement("option");
      var vc = document.querySelector("#vaccineCenter");
      while (vaccineCenter.options.length > 1) {
        vaccineCenter.remove(1);
      }
      for (let i = 0; i < last_responseOb.sessions.length; i++) {
        var last_opt = document.createElement("option");
        console.log(last_responseOb.sessions[i])
        // opt.value = `${responseOb.sessions[i].center_id}`
        last_opt.value = `${i}`
        last_opt.text = `${last_responseOb.sessions[i].name}`
        vc.add(last_opt, null);
      }
      console.log(last_responseOb)
      // var vb = responseOb
    }
  }
  last_xhr.send()
  document.querySelector("#vaccineCenter").addEventListener("change", () => {
    var vcc=document.querySelector("#vaccineCenter")
    idd = parseInt(vcc.value)
    // document.querySelector("#pincode_html").setAttribute('placeholder', `${last_responseOb.sessions[idd].pincode}`)
    document.querySelector("#vaccine_html").setAttribute('placeholder', `${last_responseOb.sessions[idd].vaccine}`)
    // document.querySelector("#feetype_html").setAttribute('placeholder', `${last_responseOb.sessions[idd].fee_type}`)
    document.querySelector("#fee_html").setAttribute('placeholder', `${last_responseOb.sessions[idd].fee}`)
    document.querySelector("#agelimit_html").setAttribute('placeholder', `above ${last_responseOb.sessions[idd].min_age_limit}`)
    document.querySelector("#dose_html").setAttribute('placeholder', `${last_responseOb.sessions[idd].available_capacity}`)
    document.querySelector("#dose1_html").setAttribute('placeholder', ` ${last_responseOb.sessions[idd].available_capacity_dose1}`)
    document.querySelector("#dose2_html").setAttribute('placeholder', ` ${last_responseOb.sessions[idd].available_capacity_dose2}`)
    document.querySelector("#address_html").textContent = last_responseOb.sessions[idd].address

    var slo = document.querySelector("#slots_html")
    console.log(slo.length)
    while (slo.lastElementChild) {
      slo.removeChild(slo.lastElementChild);
    }
    for (let i = 0; i < last_responseOb.sessions[idd].slots.length; i++) {
      var btn = document.createElement("button");
      btn.setAttribute("class", "list-group-item list-group-item-action")
      btn.textContent = last_responseOb.sessions[idd].slots[i]
      slo.appendChild(btn)

    }
  });
}
function toggleText() {
  var x = document.getElementById("Myid");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
