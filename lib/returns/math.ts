export function compoundFV(capital: number, r: number, years: number){
  return capital*Math.pow(1+r, years);
}
export function revenueProjection(ntm: number, gPct: number, years: number){
  const g=gPct/100;
  return Array.from({length:years+1},(_,i)=> ntm*Math.pow(1+g,i));
}
export function marketCap(price: number, fdShares: number){
  return price*fdShares;
}
export function revenueMultiple(marketCap: number, ntm: number){
  return ntm>0? marketCap/ntm : 0;
}
export function sharesPurchased(investment: number, entryPrice: number){
  return investment/entryPrice;
}
export function exitMarketCap(rev: number, mult: number){
  return rev*mult;
}
export function exitSharePrice(cap: number, fdShares: number){
  return cap/fdShares;
}
export function moic(finalValue: number, investment: number){
  return finalValue/investment;
}
export function approxIRR(moicVal: number, years: number){
  return Math.pow(moicVal, 1/years)-1;
}

// Dev-only assertions for acceptance tests
if (process.env.NODE_ENV !== 'production') {
  const price=5.17;
  const fd=270_517_628;
  const ntm=165_000_000;
  const growth=45;
  const horizon=3;
  const investment=100_000;
  const low=10.0; const high=16.5; const mid=(low+high)/2;
  const cap=marketCap(price, fd);
  const mult=revenueMultiple(cap, ntm);
  const revProj=revenueProjection(ntm, growth, horizon);
  const exitRev=revProj[revProj.length-1];
  const shares=sharesPurchased(investment, price);
  const exitCapMid=exitMarketCap(exitRev, mid);
  const exitPxMid=exitSharePrice(exitCapMid, fd);
  const valueMid=shares*exitPxMid;
  const moicMid=moic(valueMid, investment);
  const irrMid=approxIRR(moicMid, horizon);

  const passA=Math.abs(cap-1_398_576_136.76)<1 && Math.abs(mult-8.48)<0.1;
  const passB=Math.abs(exitRev-503_023_125)<1;
  const passC=Math.abs(moicMid-4.7656)<0.01 && Math.abs(irrMid-0.6828)<0.001;

  console.log('TestA', passA?'PASS':'FAIL');
  console.log('TestB', passB?'PASS':'FAIL');
  console.log('TestC', passC?'PASS':'FAIL');
}
