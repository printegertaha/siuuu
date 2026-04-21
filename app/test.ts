
// هنا قدرنا نستقبل اكتر من نوع واحد عادي
function multiTypes<T1, T2>(val1: T1, val2: T2): string {
  return `my name is: ${val1} and my age is: ${val2}`;
}

console.log(multiTypes<string, number>("taha", 20));

