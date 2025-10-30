(function(){
  const factorMap = window.COMMUTATION_FACTORS || {};
  function q(id){return document.getElementById(id);}
  function money(x){ return Number.isFinite(x)?x.toFixed(2):'0.00'; }

  // populate factor table
  (function populate(){
    const tbody = q('factorTable').querySelector('tbody');
    Object.keys(factorMap).sort((a,b)=>a-b).forEach(k=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${k}</td><td>${factorMap[k].toFixed(3)}</td>`;
      tbody.appendChild(tr);
    });
  })();

  q('calculateBtn').addEventListener('click', ()=>{
    // show popup ad (placeholder)
    q('popupAd').style.display = 'flex';
//--- service years calculation fix ---
// ===========================
// Auto-calculate Service Years
// ===========================
  const dob = q('dob').value ? new Date(q('dob').value) : null;
  const doe = q('doe').value ? new Date(q('doe').value) : null;
  const serviceYears = parseFloat(q('serviceYears').value) || 0;
  document.addEventListener('DOMContentLoaded', () => {
  const enrolInput = document.getElementById('enrolment');
  const retireInput = document.getElementById('retirement');
  const serviceInput = document.getElementById('serviceYears');

  function calculateServiceYears() {
    const enrolDate = enrolInput.valueAsDate;
    const retireDate = retireInput.valueAsDate;

    if (enrolDate && retireDate) {
      let years = retireDate.getFullYear() - enrolDate.getFullYear();
      const monthDiff = retireDate.getMonth() - enrolDate.getMonth();
      const dayDiff = retireDate.getDate() - enrolDate.getDate();

      // Adjust if retirement month/day are before enrolment month/day
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        years--;
      }

      serviceInput.value = years >= 0 ? years : 0; // never negative
    }
  }

  enrolInput.addEventListener('change', calculateServiceYears);
  retireInput.addEventListener('change', calculateServiceYears);
});

    /*const dob = q('dob').value ? new Date(q('dob').value) : null;
    const doe = q('doe').value ? new Date(q('doe').value) : null;
    const dor = q('dor').value ? new Date(q('dor').value) : null;
    let serviceYears = parseFloat(q('serviceYears').value) || 0;
    if(!serviceYears && doe && dor) serviceYears = Math.floor((dor - doe)/(365.25*24*3600*1000));
    if(!serviceYears && doe) serviceYears = Math.floor((Date.now() - doe)/(365.25*24*3600*1000));*/
//end--- service years calculation fix ---

    

    const basicPay = parseFloat(q('basicPay').value||0);
    const msPay = parseFloat(q('msPay').value||0);
    const classPay = parseFloat(q('classPay').value||0);
    const xgp = parseFloat(q('xgp').value||0);
    const daPerc = parseFloat(q('daPerc').value||0);
    const computation = q('computation').checked;
    const leaveDays = parseFloat(q('leaveDays').value||0);
    const lastApff = parseFloat(q('lastApff').value||0);
    const commuteRate = parseFloat(q('commuteRate').value||50);

    // Basic Pension (without computation)
    const basicPension = (basicPay + msPay + classPay + xgp)/2;
    const daAmount = basicPension * daPerc/100;
    const basicWithDA = basicPension + daAmount;

    // age at enrollment
    let ageAtEnrollment = 0;
    // approximate age at enrollment: (doe - dob)
    if(dob && doe) ageAtEnrollment = Math.floor((doe - dob)/(365.25*24*3600*1000));
    const ageNext = Math.round(ageAtEnrollment + Number(serviceYears));
    let purchaseValue = factorMap[ageNext];
    if(!purchaseValue){
      const ages = Object.keys(factorMap).map(x=>parseInt(x)).sort((a,b)=>a-b);
      const nearest = ages.reduce((a,c)=> Math.abs(c-ageNext) < Math.abs(a-ageNext) ? c : a);
      purchaseValue = factorMap[nearest];
    }

    let commutationAmount = 0;
    let serviceAfterCom = basicPension + daAmount;
    if(computation){
      const commutedPortion = basicPension * (commuteRate/100);
      commutationAmount = commutedPortion * 12 * purchaseValue;
      serviceAfterCom = (basicPension - commutedPortion) + daAmount;
    }

    const reckonEmoluments = (basicPay + msPay + xgp + classPay);
    const gratuity = 0.5 * ( reckonEmoluments + (reckonEmoluments * daPerc/100) ) * ( Number(serviceYears) + 5 );
    const leaveEncash = ((basicPay + (basicPay * daPerc/100))/30) * leaveDays;
    const transferGrant = ((basicPay + msPay) * 80)/100;
    const agi = 600000;
    const echs = 30000;
    const totalLump = commutationAmount + gratuity + leaveEncash + transferGrant + lastApff + agi;

    // fill results table
    const tbody = q('resultTable').querySelector('tbody'); tbody.innerHTML = '';
    const rows = [
      ['Basic Pension (before DA)', money(basicPension)],
      ['DA on Basic Pension', money(daAmount)],
      ['Basic Pension after DA', money(basicWithDA)],
      ['Commutation Lump-sum', money(commutationAmount)],
      ['Service Pension after Commutation (monthly)', money(serviceAfterCom)],
      ['Retirement Gratuity (estimate)', money(gratuity)],
      ['Leave Encashment', money(leaveEncash)],
      ['Transfer Grant', money(transferGrant)],
      ['Last APFF Fund', money(lastApff)],
      ['AGI (fixed)', money(agi)]
    ];
    rows.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r[0]}</td><td>${r[1]}</td>`;
      tbody.appendChild(tr);
    });

    q('resultBlock').style.display = 'block';
    q('redArrow').style.display = 'inline';
    q('ageNextHighlighted').textContent = ageNext;

    // bold matching factor row
    document.querySelectorAll('#factorTable tbody tr').forEach(tr=>{
      tr.style.fontWeight = (tr.children[0].textContent == String(ageNext)) ? '700' : '400';
    });

    // show preview image already loaded from /img folder (no change)
  });

  q('closePopup').addEventListener('click', ()=>{ document.getElementById('popupAd').style.display='none'; });
  q('resetBtn').addEventListener('click', ()=>{ document.getElementById('pensionForm').reset(); document.getElementById('resultBlock').style.display='none'; });

  // jobs link
  q('openJobs') && q('openJobs').addEventListener('click', ()=>{
    const state = q('stateSelect').value;
    if(!state){ alert('Please select a state'); return; }
    const url = 'https://www.freejobalert.com/state-government-jobs/?s=' + encodeURIComponent(state);
    window.open(url, '_blank');
  });

})();
