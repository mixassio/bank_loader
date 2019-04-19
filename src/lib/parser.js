
// eslint-disable-next-line max-len
// ['USER', 'TYPE', 'BANKL', 'BANKA', 'NAME1', 'NAME2', 'NAME3', 'NAME4', 'BNKLZ', 'REGION', 'POST_CODE1', 'CITI1', 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', 'STRAS', 'BRNCH', 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid']

const parser = {
  '00': () => [],
  10: bankObj => ['', 'РКЦ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, 'BRNCH', 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  12: bankObj => ['', 'ОТДЕЛЕНИЕ ЦБ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, 'BRNCH', 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  15: () => [],
  16: () => [],
  20: bankObj => ['', 'БАНКИ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, bankObj.accounts[0].Account, 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  30: bankObj => ['', 'ФИЛИАЛЫ БАНКОВ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, bankObj.accounts[0].Account, 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  40: bankObj => ['', 'ПУ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, 'BRNCH', 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  51: () => [],
  52: () => [],
  60: () => [],
  65: () => [],
  71: () => [],
  75: () => [],
  78: () => [],
  90: bankObj => ['', 'КУ и ЛИКВ', bankObj.bic, bankObj.NameP, bankObj.NameP.substr(0, 40), bankObj.NameP.substr(41, 40), '', '', bankObj.bic, bankObj.Rgn, bankObj.Ind, `${bankObj.Tnp} ${bankObj.Nnp}`, 'CITI2', 'STREET', 'HOUSE_NUM1', 'HOUSE_NUM2', 'BUILDING', 'FLOOR', 'ROOMNUMBER', bankObj.Adr, bankObj.accounts[0].Account, 'SWIFT', 'TEL_NUM1', 'BANK_DELETE', 'fc__uuid'].join(';'),
  99: () => [],
};

export default parser;
