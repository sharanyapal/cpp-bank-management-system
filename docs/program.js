/* Browser adaptation of Visual C++ 2010/bank-management-system.cpp.
   Original C++ binary records are represented as browser localStorage JSON. */
window.runProject = async function (ui) {
  let accounts = ui.load('accounts', []);
  const save = () => ui.save('accounts', accounts);
  const find = number => accounts.find(account => account.number === number);
  const typeLabel = type => type === 'S' ? 'Savings' : 'Current';
  function show(a) {
    if (!a) { ui.line('Account number does not exist'); return; }
    ui.line('\nAccount No. : ' + a.number);
    ui.line('Account Holder Name : ' + a.name);
    ui.line('Type of Account : ' + a.type + ' (' + typeLabel(a.type) + ')');
    ui.line('Balance amount : ' + a.balance);
  }
  async function details(existing = null) {
    const number = existing ? existing.number : await ui.int('Enter The account No. :', 1, 999999999);
    const name = await ui.text(existing ? 'Modify Account Holder Name :' : 'Enter The Name of The account Holder :', 49);
    const type = (await ui.pick(existing ? 'Modify Type of Account (C/S):' : 'Enter Type of The account (C/S) :', ['c','s'])).toUpperCase();
    const minimum = type === 'S' ? 500 : 1000;
    const balance = await ui.int('Enter The amount (>= ' + minimum + ' for ' + typeLabel(type) + '):', minimum, 1000000000);
    return {number,name,type,balance};
  }
  ui.head('BANK MANAGEMENT SYSTEM');
  ui.line('Create and manage bank accounts — browser edition.');
  while (true) {
    ui.screen('MAIN MENU');
    ui.line('01. NEW ACCOUNT');ui.line('02. DEPOSIT AMOUNT');ui.line('03. WITHDRAW AMOUNT');
    ui.line('04. BALANCE ENQUIRY');ui.line('05. ALL ACCOUNT HOLDER LIST');
    ui.line('06. CLOSE AN ACCOUNT');ui.line('07. MODIFY AN ACCOUNT');ui.line('08. EXIT');
    const choice = await ui.int('Select Your Option (1-8):', 1, 8);
    if (choice === 8) { ui.line('Thanks for using bank management system'); return; }
    if (choice === 1) {
      const record = await details();
      if (find(record.number)) ui.line('Account number already exists.');
      else { accounts.push(record);save();ui.line('Account Created..'); }
    } else if (choice === 5) {
      ui.head('ACCOUNT HOLDER LIST');
      if (!accounts.length) ui.line('No accounts have been created.');
      else {
        ui.line('A/c no.    NAME                    TYPE     BALANCE');ui.rule('=', 60);
        accounts.forEach(a => ui.line(String(a.number).padEnd(12)+a.name.slice(0,22).padEnd(24)+a.type.padEnd(9)+a.balance));
      }
    } else {
      const number = await ui.int('Enter The account No. :', 1, 999999999);
      const a = find(number);
      if (!a) { ui.line('Record Not Found'); continue; }
      if (choice === 2) {
        const amount = await ui.int('Enter The amount to be deposited:', 1, 1000000000);
        a.balance += amount;save();ui.line('Record Updated. New balance: ' + a.balance);
      } else if (choice === 3) {
        const amount = await ui.int('Enter The amount to be withdrawn:', 1, 1000000000);
        const minimum = a.type === 'S' ? 500 : 1000;
        if (a.balance - amount < minimum) ui.line('Insufficient balance. Minimum required: ' + minimum);
        else {a.balance -= amount;save();ui.line('Record Updated. New balance: ' + a.balance);}
      } else if (choice === 4) {
        ui.head('BALANCE DETAILS');show(a);
      } else if (choice === 6) {
        const yes = await ui.pick('Close account ' + number + '? (y/n):', ['y','n']);
        if (yes === 'y') { accounts = accounts.filter(x => x.number !== number);save();ui.line('Record Deleted ..'); }
      } else if (choice === 7) {
        ui.line('Enter The New Details of account');
        const updated = await details(a);
        Object.assign(a, updated);save();ui.line('Record Updated');
      }
    }
  }
};
