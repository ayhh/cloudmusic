
const parseRep = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lineString = lyricString.split("\n")
  const lyricList = []

  for (let line of lineString) {
    const result = parseRep.exec(line)
    // console.log(result);
    if (!result) continue
    const time1 = result[1] * 60 * 1000
    const time2 = result[2] * 1000
    const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
    const time = time1 + time2 + time3
    // console.log(time);
    const content = line.replace(parseRep, '').trim()
    // console.log(content);
    const lineObj = {
      time,
      content
    }
    lyricList.push(lineObj)
  }
  return lyricList
}

