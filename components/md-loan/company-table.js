/**
 * วาดตารางเงินยืม MD ของบริษัทเดียว (ใช้ร่วมกันทุกกล่อง table-*.html)
 * renderMdLoanTable("QFC", element)
 */
function renderMdLoanTable(key, el) {
  const c = MD_LOAN_CALC.companies.find(x => x.key === key);
  if (!c) { el.innerHTML = `<div class="text-red-500 text-sm">ไม่พบข้อมูลบริษัท ${key}</div>`; return; }

  const col = c.color;
  const th = `class="px-4 py-3" style="background-color:${c.headBg};"`;
  const title = c.key === 'RESERVE' ? `เงินยืม MD-${c.name}` : `เงินยืม MD-${c.name} ${MD_LOAN_CALC.labels.period}`;
  const hasTx = c.rows.length > 0;

  const txRows = c.rows.map(r => r.repaid
    ? `<tr class="hover:bg-gray-50 bg-green-50">
         <td class="px-4 py-2 text-center">${r.date}</td>
         <td class="px-4 py-2 text-left text-green-700">${r.desc}</td>
         <td class="px-4 py-2 text-red-500">${fmtMoney(r.lent, true)}</td>
         <td class="px-4 py-2 text-green-600">${fmtMoney(r.repaid)}</td>
         <td class="px-4 py-2">${fmtMoney(r.balance)}</td>
       </tr>`
    : `<tr class="hover:bg-gray-50">
         <td class="px-4 py-2 text-center">${r.date}</td>
         <td class="px-4 py-2 text-left">${r.desc}</td>
         <td class="px-4 py-2 text-red-500">${fmtMoney(r.lent)}</td>
         <td class="px-4 py-2"></td>
         <td class="px-4 py-2">${fmtMoney(r.balance)}</td>
       </tr>`
  ).join('');

  // แถว "รวม" (เฉพาะเดือนนี้) แสดงเมื่อมีรายการ
  const monthRow = hasTx ? `
    <tr class="bg-gray-100 font-medium">
      <td class="px-4 py-2"></td>
      <td class="px-4 py-2 text-center">รวม</td>
      <td class="px-4 py-2 text-red-600">${fmtMoney(c.monthLent, true)}</td>
      <td class="px-4 py-2 text-green-600">${fmtMoney(c.monthRepaid, true)}</td>
      <td class="px-4 py-2">${fmtMoney(c.monthNet)}</td>
    </tr>` : '';

  el.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-sm h-full">
      <h3 class="text-lg font-semibold text-${col}-700 mb-4 flex items-center">
        <span class="w-2 h-6 bg-${col}-500 rounded mr-3"></span> ${title}
      </h3>
      <div class="table-container">
        <table class="w-full text-sm whitespace-nowrap">
          <thead>
            <tr>
              <th ${th}>Date</th>
              <th class="px-4 py-3 text-left" style="background-color:${c.headBg};">Description</th>
              <th ${th}>Amount Lent</th>
              <th ${th}>Amount Repaid</th>
              <th ${th}>Balance</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr class="bg-${col}-50">
              <td class="px-4 py-2 text-center text-gray-500">-</td>
              <td class="px-4 py-2 text-left text-gray-600 font-medium">${MD_LOAN_CALC.labels.carryOver}</td>
              <td class="px-4 py-2">${fmtMoney(c.carryOver)}</td>
              <td class="px-4 py-2"></td>
              <td class="px-4 py-2 font-semibold">${fmtMoney(c.carryOver)}</td>
            </tr>
            ${txRows}
            ${monthRow}
            <tr class="bg-${col}-100 font-bold text-${col}-900 border-t-2 border-${col}-300">
              <td class="px-4 py-3"></td>
              <td class="px-4 py-3 text-center">${hasTx ? 'รวมสุทธิ' : 'รวม / รวมสุทธิ'}</td>
              <td class="px-4 py-3">${fmtMoney(c.totalLent)}</td>
              <td class="px-4 py-3">${fmtMoney(c.monthRepaid, true)}</td>
              <td class="px-4 py-3">${fmtMoney(c.balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}
