/**
 * --- Part Two ---
 * The Elf looks quizzically at you. Did you misunderstand the
 * assignment?
 *
 * Looking for the instructions, you flip over the word search to find
 * that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in
 * which you're supposed to find two MAS in the shape of an X. One way
 * to achieve that is like this:
 *
 * M.S
 * .A.
 * M.S
 * Irrelevant characters have again been replaced with . in the above
 * diagram. Within the X, each MAS can be written forwards or backwards.
 *
 * Here's the same example from before, but this time all of the X-MASes
 * have been kept instead:
 *
 * .M.S......
 * ..A..MSMS.
 * .M.S.MAA..
 * ..A.ASMSM.
 * .M.S.M....
 * ..........
 * S.S.S.S.S.
 * .A.A.A.A..
 * M.M.M.M.M.
 * ..........
 * In this example, an X-MAS appears 9 times.
 *
 * Flip the word search from the instructions back over to the word
 * search side and try again. How many times does an X-MAS appear?
 */

function day4part2(input: string) {
  const graph = input.split('\n').map(row => row.split(''));
  let count = 0;

  // O(r * c)
  for (let r = 1; r < graph.length - 1; r++) {
    for (let c = 1; c < graph[0].length - 1; c++) {
      if (graph[r][c] === 'A') {
        count += explore(graph, r, c);
      }
    }
  }
  return count;
}

function explore(graph: string[][], row: number, col: number) {
  const deltas = [
    [
      [-1, -1],
      [1, 1],
    ],
    [
      [-1, 1],
      [1, -1],
    ],
  ];
  let fits = false;

  // O(1)
  for (let [[rd1, cd1], [rd2, cd2]] of deltas) {
    if (
      !inBounds(row + rd1, col + cd1, graph) ||
      !inBounds(row + rd2, col + cd2, graph)
    ) {
      continue;
    }
    fits =
      (graph[row + rd1][col + cd1] === 'M' &&
        graph[row + rd2][col + cd2] === 'S') ||
      (graph[row + rd1][col + cd1] === 'S' &&
        graph[row + rd2][col + cd2] === 'M');
    if (!fits) return 0;
  }

  return Number(fits);
}

function inBounds(row: number, col: number, graph: string[][]) {
  const rowInBounds = 0 <= row && row < graph.length;
  const colInBounds = 0 <= col && col < graph[0].length;
  return rowInBounds && colInBounds;
}

{
  const graph = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

  console.log(day4part2(graph));
}

{
  const graph = `
  XMMAMXMMSMXMMXMSMAXMAXSXMXXMXSMXXASMXSXMXMXMXMXXXXMASMSMAMMMSSSMASXMXSASXMXAAXXMMXAMXSXMASXAXMAMXXXMSAMSAMXXXMAXSAMXSAMMXXXSSMSMSSXMSMAAXXMX
SXSAXXXXXXAMAMXAXXMMSMSAMXAMAMMMMXMXAMXMAMASAMMSXMASXAAMAXMAAAAXAMXMMMASMMMMMMSMMXAMASASMSMSMSMSMSASAAMSAMXMASAAMSXAMAMXSMMXAAXAAAMSASMXMASX
SXSMSMXAMSSMMASXSSMMAAXAMXAMMXAAMASMMSAXMXAXAXAXMASXMSMSASMMMXMMMSAMAMXMAXMAAAMAMSXMAXMMAMAAXAAAXMMMMMXSAMSSMMXSXAMMSMMMXAASMMMMMMMSASXAAXXA
SAXAAAMAAAXAXMAMMMAMMSXMMSSMSMSMSASAAMXMSMSMSMSMSSMXAAXMASMASAXAAMXSASMXMASXSMMAMMAMASMMSMSMSMSMMMSSXMASAMAMXMAXMMMMAAAXMSMXXAXMAXXMAMXXMAXX
MMMSMSAXXASMMSASMSAMXXAAMAMASMMXMASMMSSMSAMAMAXASAMXSXXMXMXASMSMSSMSXXMAMXMAMMSMSXXMMSAAXMAXMAMXAMASAMXSSMXSAMXXAXMSXSSXXMAXSMSSXXXMSMSMSSSS
SAAXMAXSMXMXMSAMXSASASMMMMMAMASMMAMAXSXAMMMMMAMMMXMAMMSMMMMMMAXMXAMXAMSMMAMAMAMASMXXXMMMMSMMSXSXSMASXMXMAXXSASMMXSMMAMAXSMMMSAXMMSXAXAAAXAAM
SMSSMXMXMMAMXMAMAXXMAXSAMXMASXMAMASMMSMMMAAXMAMXMASMSAAAAXASXSSMSSMMXMAAXSSMSMMAMAMASXSAXAXXAASAMMMMMSMSMMMXAAAMASAMMMAMXAXAMMMAASMMMSMSMMMM
XXXMXAMAXAAMAMMXSXXMAMSSMMSXXAMXMMSXAXAXASXSMSAMXXXAMXSSMSASMMAAAAXAXMXSAAAXSAMXSAMXMASASMSMMSMAMSXAAMAAAAXXXXAMXSAMXMMSSMMSSXMMMMAAAXMMXMAS
SMMMMMSMSXXXXSAAMAMMSMXXXAXMSMSAMXMMMMSMXXMMXMASMMMMMAXAXMXMASXMMSMMMSAMXMAMMAMASAMXMAMAMXAXXAMMMMXMMXXSSMSMMSMMXSAMXMAMXMAMAXMXXXXMXXAMXSAS
MAAAAMAMXAXSMMMXSAMAMMMSMXSAAASASAMASAMXAMAXMAXAMSAASAMXXMASMMASMXMXAAAMXXAAXAMMSXMSMMXAMXSXMASAASMSAAMAMMAMAAAAAMAXMMMXMMSSSMMMMSXAMMSMMMAS
XSSXXXXSMSMAAXAMSAMMSASXAXMMMAMASXXAMSSMSSSMSMSAMMSMSASXMSASASAMXAMMXSSMXMMSSSSXMAXMAMSXSAXAMASMXMAMMSAAMSAMMXMMMSAMSMMAAXAAMMSAAAMXMAMASMMM
XMAXSSMSAMSXMMSXSXMASXSMSMMMXXMASMSSMXSAAAAAAMMAMAMMSASMMMASAMXMMASAAMXMSAAMXAXMMMSMAMAMMAXXMAXMSMMMAXXMMSASMMSAXAMSAASMSMMSMAMMMMSAMMSAMAXS
MMAMMAAMAMAXSAMXXXXXMMSMMAAAAXSAMAAAAAMMMXMMMXXAMXSAMXMAAMMMMMMSSSXMASAMXSASMSMSAAAXAMAAMMMSSXSAMSXMMMSSMSAMAASXMASXMXMXAXAXMXMSXMSASAMXSXMM
ASXMXAMMXMXXMASMSXSASAMASXMMSXXAMMMSMXMSSSMSXSSXSAMXSMSXMMMAXMAXMAXXAMAXAMXSAAASMSMSMSASAMXAAASMXAXXXAAAAMMMMMSXAXAXXMMSMMMSMSXSAASAMXSMMMSS
MMASMSMMXSSMSAMXAASAMSMMMMAXXASXMMXMASXXMAAMAMAMMXXAMXAXMASXSMSSSMSMMSAMSSMMXMMMMXXXAXAMASMMSMXXSMSMSSSMMMAMAMXXMMMASAMXAAAAMSAXMMMXMMMXAAAA
XMAMXXAXAMMXMASMSMMXMAMSASAMXXAXASXMAMMASMMMAMXMXMMSSMMMSASAAAAAAXAAAMAMXAMAAMASXXMMSMXSAMXAMXXMAXAAXAAMSMXSASASXXMASMMSMMSSSMMMSAMXSXMSMMSS
SMSSMSSMMSAXSAMMMAXXXSXSASMMMSMSMMAMMMMAMAASMSMSXAMAAAAAMXMMMMMXMMMSMSSMSAMSXSAMAMXAAAXMASMSSMMXMXMXMSMMAAMSAMASXXMASXXAXXAMAMXAXAXAXAMXMAMX
AMAAAMXAMXAMMAMXSXMMMMAXXMAXMAAMASXMASMMSMMXAAAXAMMSSMMMSAMXXAMAAAXAXXAAMXMAMMASXAMMSSXSAMAMAMSSSXMSAXXSMMMMMMAMAMMXSMSSXSAXAMMMSMMMSAMXMASM
MMSMMSMSMSXXMXMXAMMAAMMMMSXSSMSMAMASASAAAASMSMSSSMAMAXAXSASMSASXSSSMSSMMMSMMXSAMMSSMMAMAAMAMAAAAMAAMSMMMAAMAMMXSSSMSMMAMMSAMSSMMAMAAMAXSSMSX
XAXXMAAAAMASMAMXMASXSSMAXMAXAAXMMMXMASMMXSMAAAXAAMXMMMAMSXMXSASAMXAMXMASXXAAAMASAAAXMASXMSMMSMMMMMMMAMASMXSASXXXXAXSAMASXMAMAAMSMSMSSMMMAAXM
MMMMMMXMAMAAMASAMMMAMAXSXMMMMAMAXXMMMMXAMMMSMSMMMMSXMASMXAMASXMASXMMAMMMASMMSSMMMSXMXAMAASAAXASMXMAXMMAXAASMMMSSSMASAMASXSSMSXMAXXAAXXASMMMX
AMASXMMSAMMSMMMASXMSSSMMXXAAXAMXMMSAMMMSXSAMXXAXAXMAMXMASXMAMAMAMMASXSASMXMXXAAXXAASXMMSMMMMMAMXAXMSXMMSMXMMAXAAAXMSAMAXAXAAXSSXSMSMMSMSXMAM
XMASAAASASXMAMXAMXAAAMAMMSSSSMSMSAXASMAXXMMMMMMXMMSAMAXMXXMASMMSSXMXAMAMXMXXXSMMMMMMAXAMXMSXMSMSMSAAXAASMMASXSMSMMXXAMMXSXMMMMXAAAAAAAAMAXSA
SMASXMMSAMXXMMASMMMMSMAMAXMAXXAAXSSXMMASMMAAAAMASMSASMSXMSMASAAXXMXMSMXMASMMMXAAMASMMMXSAMMSMAAAAAXMXMXXASAMXMXAMSMSSMSAAASMSSMSMXMSSSXSAMXS
XMAXAXMMMMMMXMMMAXMAXMASXXSSSSMSMASXAMASASXSSMXAMAXAMAAXAAMXSMMMSMAAAAMSAMAAXSSMSASAXAASAMAAXSSMXMAXSMMMAMXSAXSASAAMMAMMXMMAAXAAMMMMAAAMMSXA
SSXSAMAAAAASXMXSMMSSMSXSXMAMAAAMMAMSMMASMMAMAAMSMMMSSSMMSASASMAAAXSSMSMMASXXMAXXMASMMMMSSMSSMMAXXSMAAXMASXXMAXSXSMMMMMXMXSMMMMSMMAAMMMMMASXM
MAMMXSMSMSMSAMXAAAAAXSAMXAMMSMMMMXMAMSMMMMSMAMAAAMAMAAXXMSMASMXXMMMAMAMSMMASMMMMSAMXSAMMAMXMAXXMMASXSSMXMASMXMMASAMSAMSAMXAAXXMASXSSXAXMASMX
XMASAXXMXXXSAMXMMMSMMXMAMXSAMXSMAMMAXSAMXAXXXXXSSMAXSMMXXXMAMMSMXASAMMMMMMAMAAMXMAMXSAXXAMMSSMSASAMXMXMXMASXMAMAMAMSASXMASMMMAMAMAAAXMXMASAX
SXMMXSAMXMMSAMSXSAMAMMXMSMAAAAMMASMSMSAMMMXMMSAMXXSXMXMMXMXSAAAAMMSAMMAAAMAXMXMSSSMASXMSXXAAAASMMXSXMASXMXSASXMAMSMMMMASMMSSMXMAMMMMMMAMAMXM
XXMAXMAMMMAMAMXAMAMAMAAMAASXMASMXSXAASXMXSAAAXAXAMMASAMXSMAXMSSSSMMMSSSSSSXSMSMMAAMXMSXAXMSSMMMXXMAMSAMXXASXMAXAMXAMXMASMAAXAAXMMSMSAXXMMSSM
AMMXXMAMXMSMMMMSMMSSMSXSAXMAMXAMXXXMMMXSASMSMSSMASXSMAMMSMASXXMAXXAAAXXAXXAAAXAMSMMAAMMMSXAAXMXMASMMXSXXMASMSSMMMSAMAMASMMSSSSXSAAAMMSMAAAMA
SXSAMSAMMXMAAAAMAXAMMXMAXXMXSAAMXMASXMAMMSAMAAXSAMXAXSMAXMASAAMXMAMMSSMMMMSMMMSMAMMMAMXXMMSSMSMSASMSAMSXSAMMAAAXXSAMXMAXAXMAMAAMSMMMASMMMSSX
MAMAXXMMXAXXXMSMSMMSSXMASMSAMXSMSAXXAMASXSAMMMXMMSMMMXXSXMXXXAMXAXXMAMXAAXXAAAMMMMSSMMSAMXAMAAAMAXAMAMXXAAMMMSMMXMASMMMSSMSAMMXMAXAMXSAXMXMM
MXMSMSMSMMSXSAMXMAXAMMXMXXMAMAMAXSAMXSXSASXMASAAAAMXMXAMMSMMXMAXSAAMXSSMSSSMMMSAXAMAAAMAXMASMMSMSMSMSAMXSMMSMMMXAXAMAXAAAXXASXMSSSMSXSMMXAXA
SXMXAAXMAMAMMAMAXAMXSASXMSXSASMMMXXMAMAMXMASXMSSMSAMXMSMAAAXXXMAMMMXMXMXAMAAAASAMSMSMMXMMSMMXSAAXAAAMAXAXAXSAMSSMSSSMMMMXSSMMAXAMXAAMMMSSMSS
MAMMSMXSAMSMSAMXSMAAMMSAAXAXMXAXAMSAASAMMSAMMMMXMXMAMMAXSMSMASMMMXMAAMMMSSSMMXSXAXAXASASAMXMXMASMXMMSSMMSSMSAMAAAAAAXMASAMASMXMAMMXMXXAMAAAA
SAMAASXMXMXASAXMAXAMXAXMMMMMXSXMSAASXMASAMASMAXMASXSSMMMMXAAXAAASMSMXSAAMXMASMMMXMAMASASXXAAAAXMXXXAAXAAXMASMMSMMMSMMMSMMSAMXAXMSSMMMMMSMMMM
SASMMMMSSMMMMMSMXSXMMXXAAAAAAAASMMAMSMXMMSXMXMSMMXXAAMXAMSXSAXSMSAAAAMMXXASAMAASXMAMXMAMASXSMSMSSSMMSSMMSMAMMAXAAMAMAXMAMXAASMMMAMAAMAMXMMSM
SXMAXSAAXAXXAXAAAXAXAXSSSSSMSSXXAXXSXSAMXMMSXMAXMASAMXSSXMAXAMMAMMMMMSAMSAMXXMMMSAMXAMXMMXMAXAAXXXAAXAAAXMAXMXSSMSASMMSAMSXMAAAMASMMSASMMAAX
SAMMMMMSSSMSMSMMSSMMXMAMXAAXAXMSMMSMASMXAAMAASAXMAMXXAXAAMAMAMMAMXXMXMAXMXMXXSXMXMAMXSXXXXAMSMMMMSMMSMMMSSXSAAXAXMMMXASAMSXMXSMMMSAXSAMAMSMS
SXSXMSAAAAAAASXXXAMASMSMMSMMMSXAAMAMMMSSXMMSAMASMSSMSMMMXMSSMMSSMAXSAMSMXAASMMMSAMXMXMMSASAMXXAAMXAAXXAXAAAMMMSAMXAXMXXAAMASAMASXMXMMAMXMXAS
MAAXMMMSMMSMSMMMMAMASAAMMAXAXAXSSSMMSAMMSXAXSMAMAAMAXXMSMAAAAXAXMAMSASAMXMSAMAAXASXSMAAMAMAMAXMSASMMSSMMMSMSXAXXASMSSSSSMSAMASAAMMAMXAMSAMAM
SMMSSMXXAXXMAAMSSMMMMXMSSMSSSSXMAAXAMAMAMMMMXMAMMMMSMMMAAMSMMMMSMSXSXMASXSMMSSXXMMAASMMSMSMMXSAMMMAMMXMAXXXAMASMMAXAAMAMAMXSXMAXSSXSAASMXMAM
AAXAAMAMAMMSXSAAAXXAXXXXAMSAAMMMSMMSXMMSMSMAXASAMXSASASMMXMAXSXSAMAXMMXMMAAXAAMSSMSMMMAAAXMASMAMXXAXMASMSMXMASXMSMMMSMMMMMAXMASXMAMXMSXMASXS
MMMSSMASMMMAMMMMSMSMSMMSAMMMMMAXXXAXASAXAAAXAMXAMXSASXSXXSSSMAAMAMMMASMMSSMMMXMAAMXMAMXSSXMXSMMMMSMXSAMAAAAXSXMXAXAXAXMASMMXSAAMMAMMSMAMMSXM
XMAXAXMSASMAMSSMXAAAAAXXAMXAAXXAMXXSMMAMSMXSSXSXMMMMMAMMXAAAMMSMAMAAMAAMAXXMAXMSMMASMSAMMXMMMMMAXAAXMAXSASXSMAMSMSMSMMSASAAMXMXAMAMXASAMAMAS
XMXXAMXMAXXAMASMMSMMSSMSSMSSSSMXXSXMXMAMAMXAMAMXMXMMXSASAMMMSAXXXXXSXMSMASMMSAMMAMASAMXSXAXAAAMSSMSMMMMXAAXAXXMAXAASXXMSSMMMAXSSXSSSMSXMASAM
MSSSMSXMSMMXMXSXAMAAAAAXAAXXMAMSAMMSASASASXMMSMSMSMAAXSAMXMAMXSMSSMMMXMMMSAAXAASAMXXMAMMMXXMSXSAMXMMMSAMXMXMMMSXSMSMXXMASMASMMMAMAAMXMASAMAS
AAAAAAXAAAASMMMMSMMMXMMSMMMSMAMMAMASASASASASAMXAAAMMMSAMXAMASMMAAXAASASAAMMMSMMSAMXSMSASXSSXAMMXMAMAXMMSASXSAAAXAMAMMXMXXMAAMAXAAMXMASMMASAM
SMSMMMMASMMMAAMXMXSMXSAMXAAAMASMMMXSXMAMXSAMXMSMSMSAMXAXSXSASAMAMSSMSASMMMAXXXMXMMMAAMASAAAMMSXXXXMSMMXSXSASMSSSMSAXMXSMSMSSSSSMSXASAMAMAMAX
XMMMMXMAMAXSMMSSMAAAAMASXMXMSAMAMXMMMMMXXMAXMASAXXSMSSXMSAMXSAMMMAAXMAMASXMSMSSMMAMMXMAMMMMSASXXSMAXAMASXMMMXXAXXMMMXAAXMAAAXMAXMXXSASMMSSSS
XSAMXAMXSMMSMSAAMSMMMSAMASXAMASAMSAMXAAMXSSMXXMAMMMSMAMMXAXASAMXMSXMMAMAMAMAMAAASXSXAMXMAMXMASMMMSASAMAXASXXXMAMMMSAMMSMMMMSXXXMXXMMAMAAAAAX
SSSSSXMXAMAXXMXMMMMSAMXSAMMMMXAMXXASXMSXMMMMMSMMSMSAMXAXXAAXMMSAXMMSSSSSSSMAMSSMMASXXSASASAMMMAAASMSXMASXMMXSMAMXAMXMAAAMAMXMSMMMMAMXMMXMMMM
XMAXAMXXAMXSMXSSMSXSMMMMASAXXXMASMMMAXMASXMAAXAAAXMAMSSMMSMXAAMXXAAXAAAXAXXXXXAAMSMMMSASXMXMASMMMSAMXAMXMASMMMAXMXSASMSMMSSXAAXMASMMMXMAXAXX
AASXMXAXSMMXAAXAAAXSASXSXSMXXAMXMAMSMMMAMAMMXSMMSMSAMMAAAXXSMMSMSMMMMMMMMMXSMSMMMMAAAMMMXSASAMAMAMAMAXXASAMAASMSMXMAXXAAAXAXSMXXAMAMAASXSMMS
XXXMXMMXAAMSSXSMMMXSAMASAMAMSSMXMAMSASMASMMSAMXSAMXMASMMMSXMXMAAAAASMMAAXAAMAXSAMXSMXSASXSAMMXAMAXAMAASXSASMMMMAMXMMMSSMMXMMMXAMXSSMSMSMAMAX
MMMAXAXXSAMXXXMASXAMAMAMMMAMMXAAXXXSAMSAMMASAMXMAMXMASMAAXAAASMSSSMSASMSXMXSSMXXSAXAXXAXAMAMSSSXMSSMXMSASAMXSXSAMAAAAXMXSAXAXMMSAAXAAAMXAMSS
AAAMMSMMMASAXMMMAMXSXMASXSSSMMMMSMAMXMMMXMXSMMASAMSMMSXMMSMSMSAAAMXSMMXMASAAAMAMMMSSSMMMSSMMMAMAMAAMXAMMMAMAAASMSXSMSXSASMMSXMASMMMSMSMMXSMX
MMSXAAAXSAMXMMAMAXAMXMXAMMMMMXAAAMXMMSAMXSAMAMASASAAXMMSAXXXAMMMMMAMXSASAMMSMMAMAMXAMXMAXAAXMAMMMSSSMMSXSXMMMMMAMAMAAAMASAMXAMASAXAAXXASMSAA
SAXMSSXMMMMAAMAXSMMAAXMMAXAAMMMXMMAMXSASMMAMXMASMSMXMMAXXAMMMMXMAMXSAMXMASAXXSXMAMXMSAMXMXSMMMSMAMXXAXMASXXAXASAMAMMMSMAMAMXAMASMMSXMXAMAMXS
AAXAAMXSAAMMSSMSAASXMSSXSSMSMSAMSMMXMXMAAMMSSMXSAMXSXMMMMAMAMSASASXMXSAMAMXMAXMASMSXSASMSMMAAAAMAMSSSMMAMXSASXSASASAAXMMSSMSMMASXMASXMSMSMAX
MSMMMSASMXXAAAXMMMMAAAXMAXXAAMSMAASXMAMMSXAAAXAMXMASXAAMSASAXMAXAXXASMXMMSSMSMMXAAXAXAMAAASMMSSSXSAMXAMXMMSASXSMMXXMSSSXXAAAXMASAXAXXAAAAMXM
SXASAMASASMMMXMXAMSMMMSMAMMASAMMSMMASAMXMMMSSMSSSMAMSSMXSXSMSMSMMMMMMMXAXAMXXAMSMSMSMSMSMMMSAAXXMMMSSMMSXAMAMAXMMXSXXAMXSMMMXXAMMAMXMXMXAMXA
ASAMXMMMAMMAMMMXMXXMAXAMAXSAXASAMASMSASAXAXAAMXAAMMMXXMASMSAAAAXMXAXAXMAMXSASAMAAAAAMAAAXAASMMSSMAMMAAAXASMSMSMASMASMAMMMAAXSMAMSSMASXSMSAXS
MMMMXSAMSMSASAAXSASXSSMSAXMXSAMASAMXSAMASMMMSMMMMSSSMAMAXXMSMSMMMSMSMMMSXXMASMMMSMSSMMSMSMMXASAMXASMSMMSAXMAAMSAMAXXMAMAMMAASXSMAXXXSAMAMXMX
XMAMAMXSAASASMSMAAXMMAXMXSAMXMMXMXMAMAMXMAAAAAXXXXAASMMMSMMXXAXAXAAAAAAAAXMMMAAXXMAXXMAMXAMXXMASXMSAXMASASMMXMMXSSMMSSSSSXMXXAXMXXMXMAMXMSAM
MAAMMMMMMXMAMMXXMSMSSXMSAMXAAMSXAAMAXAMXSSMSSSMSMMSMMSMAAAMAXMSSSMSMSMSSSMMAMMMXSMSXXMAMSAMSSMAMAXMXMMAMXMAXSAAAMAMXAMMAMXMMMXMSAMSASAMAMSAM
AXSMSAXMMMMSMMXAXXAAASXXMASMMXAMSMXMSMSMXXAMAAAXXAAAXXMXXMMXSXAXMAMAXMXAXMXAMXMASXAAMSAMSAXAAMSSXMSAMMMXSSXMASMMSMMMMXMASAAASASMAXSAMAMXMSAM
SMMASASMSAAAAMSMMMMMMMMAMXMSSXSMXXAMAXAASXXMSMMMMSMSMXXMSSMMAAMXXMMMAMXMSXSXSAMXSMMMMAMMSAMSSMMXMASASXSAXMAXXAMXAAMMAMSAMMSASXSMXMMMMSSMMSAM
MAMAMAMASMSSXMAMAXXASASAXAAAMAMAMSMSAXMSMAAXXSAAXXAXXXMMAAASXXSAMXASAMMXXMAASAMXSASXMAMMXMXAMAXXMAMAAAMSMMSMAMSSSXSMAXMAXMMMMAMMAMXMAAAAMMXS
MAMMMXMXMXXMASASMSSMMASASMSMMAMAMAMAMASAXSXMASXSMMAMASMMSSMMMAAMSSMSASAMXAMXMASXMXMASXSXAXMASXMXMXSMMXMAXMASAAMAXAMXSMMSMXAAAAMSXSAMMSSMMMAS
SMSMMASAMMXMMSASXMASMAMAMAAXMASASMSAMXXAXMSAXMAMAMMMXMAAAXMAMXMAAXXXMMMXMSXMAXMXMAMMMXAXXMSAMXSSMMXXSXSMMSASMSMAMMMAMAAXMSMMMMAXXSXMXAMXAMAS
MAAAXXSAXXAMXMAMXMAMMXMAMXMMMAMAXXMASXMSMXASXXASMMXMXSMMMSMMSMXMASMMSAXMSAMXMSSSSSMXSMSMSAMXSXAAAXXXMAMAMMMMMAMXSAMSSMMSAASXXSASMSASASXSXMAS
MSSSMMSAMSXMXSMMSMMSAMXSMAXSXSMSMSMSAASASXAXXMASXSAMXXAMASAMXMAXMAMASAMSAMXSXAAMAMMXMAMAXXSXSMMXMMXMMSMAMAAMSMSXMMSXAXAMMMXSAXASAMAMMMAMSMXS
XXAXMAMAMMASAAAAMAMXAMAASXSAMXAMAMXAMMSAMMXMXXAMXSMSMSXMASMMASMSMAMMMXMMAMAMMMSMAMSAMMMMMAMAXSMSMSXAMASASMSMMXMAMXMXMMMXSMXMMMMMMMXMXMAMAMAM
SMMMASMSMSAMXSMMSAMSMMMXAMMAMMXMMMXMXXMMMMASXSMSAMMXMXMMMXAMXXAAMASXMAXSAMXSAMXMMSSXSASAMAMAMXXAAXMMSMSXSAXXMASAMASAMXSAAMXMAAASAMMMXSXSAXAM
AAAAAMAXAMXSAXMAMXXXMAMSMXSAMMMMAMMXMSASXSASAAAMMSMSSMMAASMSSMSMSMSASAXSMSMSXXSAMXMASASXXAMMSMSMSMAAMXMMMXMASXSASASXSAMSMMAMASXSASMMAMMSASXS
MMMSMMMMAMAMMXMSMXAAMAMXXXXAXAAXAXMAMMAMXMXSMMMMAAAMMASMXSAAXAXXAASAMSMMAAASMMSASAMXMAMMMMXAAXAAAMXMMAXMASXXMASMMMSAMXMAXSMSAMMSXMAXAXASAMXA
SSMMXAAMAMSXSAAASXMMSMSMSMSMSXXMASMXMMSMSSMSXXAMSMSMSXMMMMMMMMMMMMMAMXXMMMSMAAXMAMSAMXMXASMSSSSSSSMASXXMASMXMMMAAXMXMXMAMAAMMMASAMAXMXAMAXMM
XAASXSSXXMXASMSMSMXMAMAMXAAAMAXSASAMXXMASAMXAMXMAAXAMAAXSAAXXAAMXMSMMMXMASAXMMSMMAMXXAXMXSAXAAAAAAMAMMAXAMXXMXSMMSSMMAMXSMXMASMSAMMXSASXSMAM
SMMMAAAASXMAMXMXXAAMASASMSMSMAXMXMXAMSMMMMXXMMASMSMAMSSMSSSMSMXSAAXMAMXSXSAMSAAAXSMMSASASMXAMXMMMSMSXSAMXAAXXAMAAAMAXASASXMSASASAMAAAXMAMXAM
AXSMMMMMXAMMMASMSSXSASASAAAXMMMSAMXXAAAAAXAMXSXSXMAXAXXMXAMXMAAMMMMSAAAXMMAMMSSSXXAAAAMXXSAMXSXAXMAXAXXMSSMXSASMMMSSMMMAXAXMASAMXMMMSXMXMXMM
MMMAXMXXXMMASASAAAMMMMXMXMMMAAAXAXAXSSSMSAMXAMXSAXSMMXSMMASAMMMXSAAAMMMXAMXMAXMAMXMMSXMXMAMXAASXXSAMXMMXMAMXMAMAAXAAAAMAMSMMAMXMXSAAMXMAXAMS
XAXMMMMSXAAXMAMMMSMMASAXMMASXMMXXAXXXAXMAMSXXSASXMXMSAMXASAMSMAASMSXMASXMMSMSXSASMSMMXAXMXSMSMMXMXSAXMMXSAMXMXMSXMMSXMXSXXAMXMASASMMXAXMSMSA
SSXXAAAMMMMSMSMAMAXSASASMSASAAASXSXSSSMAAAMMMMMSXAAXMASAMMAXSMMXSAMXMAXAMAAAMMMAXAAAMMMMMAXMAAMAMAAXMAAASASXMXAMMXMAMSAMMSMMSMMMASAMSXXXAXXM
MXAXSSXSASASAAMXSMXMASASAMASMMMSAMAMAMXXMSMAMAASXSSSXAMAXMMMSASAMMMAMMSMMSMMSAMAMSSMAAAAMSSMSAMAMMSXSAMMSSMAMSASAXMAMMASAXAAAAXMAMAMAASMSMSX
MMMMXAXSASAMXMMAAMAMXMAMXMXMASXMXMAMAMXXMAMXXMSXMXAXMASXMSAASXMASXSMMAAMXMAASXMXMXAXSSSMXAXMMXXAMXAASXMAMASAMMAAXSMSMMMMXXMSSSMMXXXMMSMAMAMM
XAXSMSMMMMMMMMMSMSMSAMAMAXAMXSAMMSMMXSAXSASXXSMXSMMMSXSAAAMMSAMAMXMAMSXSAMMAMMMXMSSMAMXMMSMMMASXSMMMMSSXSAMXSMSMSMAXMAMASXMAMAMMMSMXMXMXMAMA
MXSXAAAAXAMASMAMMXXMAXAMXSMXASAMAAAXAXXAMAXAMXAAMAAAXMMMMMSAXXMMMMMAMXAMXXXMMASAAXXXMSMXAXAAMAMAAAMAAAMXMAMXSXAXAMMMSMSAAXMASXAAAAAAXAMASASM
MXSMSMSMSXSASMMSAXSXSMSMMMMAASAMSSSMMSSMMMMSSMMMSSMSSMAAAXMMXMSAAMSMSMSMMMSASASAMXSMXMMMAMSMSASMSMMMMMXASMMAMAMSSMSAAAMAMXSAMXXMSSMMSMSASXSM
XASMMMMXXAMASAMMMMSAXAXXAAXXXSAMAMAXAAAXXAAMAMXMXAXXAMSSMSASAAMSXMAAAXAAAMAAMAMAMASAAXXXXXXXMASAAAXXAAAXAMMSMSXMXAMMSSSMXMMASMSMXMXMAXMASAMM
MMSAMAXMMXMAMAMMMAMMMMMSMSSMXSAMMSMMMSSMSMSSXMAMMMMSAMXMASAMMSMXXSMSMSSSMXMSMMXSMXXSASMXSMXAMXMMSSMSMSSMASAMXXASMSMXAAAXAASMSAAMAMSSMSMMMMMA
SAMAMMXAMMMMSAMAMXXAAAXAXAAXAXXMXAXSAAAAXAAMASASAMXMAXAAAMAMAAXMXMAXXXAMXXXXXMAXMSMMSAMXAMASMMAXAAXMAAXMAMXSMSAMAASXMAMMMXMAMMMMASAAXSAMXXXM
MASXMXSSXMAMXMSSSMSSSSSMSMSMMSSSXMAMMSSMMMMSMSAMAMXXASMSSSSMSXSAMMSMSMAMXMASXMASASAMXMSXMSAXAXXMSSMMMMMSSXXXAMMMMMAXXAXXSAMAMAMSXMXXMMSAMXMX
SAMXAMXAXSASMMAAAAXAAAAAXXAAXAXMAMAMMAXXMXXXAMAMSMSMAAAAXXAAAAMXMXAAAXAMSAMSAMXMXMAXSXMXXMASAMXMXAAAAAAMMMMMSMXAMXMASAMXXAXAMAXAMXSSSMXXXAXM
MXMXMMMSMSASAMXSMSMMMSMMMSSSMMSSXMAMSAMSAMXMMMAXAAAMMMMMMSMMMSMXSMMSMXXMSAXSXSAMXSXMAAMSAMXMXSAMAMSSSMMMAAMAXMSMXMXMXAMXMXMXXSMMMMXAASAMSMSA
XMSSMSXXASAMXAMXAAXXAXMAMAMXMXXAXMAXMASAASXMXSMSMSMXAAXMASMAMAMXMAXXAAXMSMMSAMMXMASAMXMAAXMAMMAXXXAMAASXSSSMXMASXSMXSSMMASMSAAXSAMMSMMXMAMAX
MXAAMXAMAMXMMXXMMMXSXMXASAMASXSMXSMMMMMMXMAMAMMAMAAXSSSMSXMAMAXXMSMSSXSAXMAMAMAAXXSMXXSMSMSAAMSMSASMSMMAAAXAASAXMASAXAAXMAAMMMMXAMMAMMXSMSMS
MMSXMMSMAMXMASXMASAMXSMMMAXAXXXMASAXAAAXXSAMXMSASMSMMAAXAMSSSMSSMAAXAAMMMMMSAMXSSMMMSMSAXASMMMAAXAMAXAMXMASMMMXMMMMMSSMMXMMMXSMMSMSAMMAMMAMS
MAXAMAMSAMXMAXASAMASASASMXMSMMXMASASXSXMXSMSMXSXXAMXMMMMMMXAAXAASMSMMMMASXASASAXAASASAMAMAMAXXMMMAMMSAMXMAXMXXAMSXMAAAXMASXMAXMAXAMMSMASXSXS
MASAMAMXMMXMAXXMASXMASAMXSAXASXMMSAMAMMSMMMSMXMASMMAXAAXXAMMMMSXMXAAAASXXMASAMASMMMASMMXMSMXMASXSXXAXAAXMXSSMSMXAAXMSMMXAMAMXSMAMAMAAXXMMXAM
MMXAMSMSAMXMMSMSXMAMXMXMXMAXMMMSAMAMXSAAAAAMAMXAAASMSSMSSMAAXMXASXMXSXSXSSMXMAXMXAMXMAMMMAXAMXAASMMMSSMXSAMXAAMXSXMMAASMSSSMMMMMSXMSSXSAAMAM
ASXXMAASXMAXXAASMSMMMMAMXMSMAMXMASXMAMXSSMSXMMXXSMMMAXAMXXSXSAXMMAXAMAMXAAXXMMMMSSMAXAMSMMSMSMMSMMXAAAAAAAXMSMXXAAMSAMXAXMXAAAAAAAXXAMSMMSAM
ASAMXMXMASASAMMMAAXAAMASAAAMAMXSAMAMXSMMXXMASXMAXAAMXSMASXMXMMXSSSMXMASMXSMXSAMXAASMXSMSAXAAAMXMAXMMMSMSSSMAMAMSSMMAMXMSSMSXMSMSSMMMAXSAMXMM
XMASXXMSMMAXMXXMSMSSXSASMSMXSSMMSSXMMSASXSSMMAAAMSSMMXMXSAMMMXMXAXAASXXMMAMXSASMXMMXAXAXMMMSXSASMMMSAMXAAMAAMAMMAXXSXSMASAAAMXMMAMXSAMXAMSMX
MSAMXAMSXMAMXSMAMXAAMMMMXAXAXAMXAMASASMMAXAASMXXXAMXSAMAMAMAXAMMAMSMXMAMSMMMSMMXSXAASMSMMXXMXMASAAAMAXMMSMSMXAMSXMAMMXMAMMSMMAXSAMXAXMXMMASA
XMAXMSMMAMSAMSMAMMMSMMMSSSSMSAMMMSAMMSXMMMSMMXMSMMSAMAMAXASXSSSMAXAXMMMMAAXASAMAAMSMAAXSMAAAMMMMXMSSSMSAMXAMXSXSASAMXSMSMXXASAMSASXMASAASASX
MSSMMXASXMXMMXMASXAXAXAXAAAASAMMXMASXMXXSAXAMXAXAAMASXSXSXSMAAXXSXMXSAASXSMXSAMXMAASMSMMSSMSAAMAMXXAXAXASMXSAMAMAMASXSAXSASMMXXXXMAMAMMXMXSA
MAMAMSMMAXAMSSSMSMMMAMXMMMMMMXMXXSXXAAAMMMMAMMMSMMSAMXAXAMXMSMSXMAXAXSXSAXMAXAMXXSXAXMAMXMAXXSSMSSMMMMMXMXAMXSAMSMXMXMAMMXMXXMASMXMMASXMMXXM
MAMAMAASXMSAAAAASASAAAXMXXXMAXSXMMMSXMXSASMMMAAAAXXAAMMMSXMMAAXASMMSMMMMMMSSMAMSXMSMXSAMXMAMXXAAAAAMSXMASMMXAMAMXXXSXMAMXASXSASAMXSMMXAAAXSX
SSSSMSMMXAMXMXMMSAMMSXSMSMMXSAMXAAAXMAMSASXSXMSSSMMXMASAMASXSSMMMXAXXAAASXAAMAMXSAAXAMASAMXSXSMMSSMMMASASAXAXSAMXMAAAMSSMASAAMXAMXMASXMMMXAX
XAAMAXSMMSMMMSMMMMMMXAAMAMSAXASXSMXSASXMMMXSXMMMMAXAXMMASAMXAAMXMMMSSXSSSMSMMXAMMSMSXSAMXSXMASXAAAAXSAMXSXMMMAMXMAASXMAAMAMMMASMMMSAMAMSMMMX
MXMMAMAMAAAXSAMMAMAAMMXXMXMASAMMXMAXMMAXMAMMASXSSXSASXSMMMSMMXMAMAMXXAMAXXXSSXASAMXAMXMSXXAMAMMSMSMMMASXMASXXXXMMSAMXMSMMASXMASXAAMASMXAASXM
MMXMXSAMSSSMSAMSASMSSMSASXMAMAMXSXSMAMMASAXMAMAMAAMAMAASAMXXSMSXSMSAMXMXMSMAMSXMASXMMMMMXMXMAXXXAMMMXAXXSAMMMMXMAMAXXXXASXSAXSMMMXSAMXMMSMAS
ASAMXMAXAAAXMAMSASXMAAMAAXMAXAMASAMXAAMASMSMASAMXMMSMMMMMSAXXAMAMAMASAMAMAMAMXXSMMXAAXAXMASMSMAMMMAAMMSXMXXAAXAMMSMMMXSAMAMMMMAAAASMMMMSAMAM
XSMSASMMXSMMMSMMAMXSMXMXSXXSSXMAMAMSMSMAMAAMXMMAXMXAXXXAXMAXMSMXSASMMXSMSASMSMASMASMMXAMSXXAAMAMMSXSAMSXMSSSSSMSAAAAAXMAMSMSASXMMMSAAASMMMSS
AXASMSXMAXMXXASMXMMXXXSAMMXMAMMASMMSAAMAMSMXSAMXSMSMMXMASMXMSAMXSASAAXXASASAAMAMMAXASASXXAMSMSMXMSAMMAMMXAAMMAASMSSMMXMAMXASAXXMSASXMXSAAAXM
SMMMXXXXSSXSXMASMAMMMXMASASMAMSAMAAMMMMXMMAMMSMAAXMXSXSSXMASXASMMMMMMXMMMMMMMMXSMXSAMAMAMXMMMMXAAMMMMAMAMMSMSMMMAMXAXSSMSMMMSMAMSAMXMASMMMSS
MASXSSMAMMAMAXAXMAMAMASXMMSMAMMSMMXSXAMXAMAMAAMMXMASAMXXMMMXMXMAMXSASXASAMXMXSASAMMAMAMAMAMXAASMSMSXMAXMMMMAXMAMAMMMMMAAXXAAAMXMMMMXSAMASAMX
XSMAXAMAXMSMAMMSSSMXSASXMASXMSAMXSMMXMMMMSMMXSSMSSMAMASMMASXSMSAMXSAMSMMXSMMAMMMAMMMSXSASXSSMMSXAASMSMMAAAMMMXMXMXSAASMMMSMSXXAAAMSMMXSAMXSA
XMMMMXSMSMXAMSXMAAAMMAMAMXSMSMMMAMAMXSXMAAAMSMXMAAXXXXMASAXXAASASAMXMMMSAMAMXXXXAMAMSASASAXXXAMXMSMAAAMSMMSMSAAASASAMSAAXXAAXSSSMSASXXMAXSAM
AMASAAMMAMAMXMAMMMMXAAMSAMXXAXXMAXSMAMAMSMSMAASMSSMSAXSMMSSMMMSAMASXSMASMMAMMXSSXSASMAMAMMMSMSSXMAMMMSMMAXMASMSMSAMXMSXMMMSMAXMAMSAMMMSASAMX
XSAMMAXSASASAMAMXXXMMMMMASXSSSMXSXMMMMAMMSMMMXMXMAAAAMXMAXXAXXSMSXMAAMAMXSSMSAAMAMMSMSMSMMAMAAAAASAMAXASXMMXMXAXMXMAXXAXSAMXXAMSMMAMAAXMAXSS
MMASXMASAMAMASXSSMMAXMXSMMAAAAAAMASXSSSSXAMXSAMXSMSMMAAMXXAXMMSAAXMSMMASXXAAMMSMAMSMMAAAMMAMMMSMMMAMXMAMMXSAMXSSMXSMSSSMMASXXAMAXSXSMMSAMXXM
MSMMMSMMAMMMAMAAXAMSMSAMAMXMSMMMSAMAMAMAMASAMXMXMXXMSMMSMMSMSAMAMXMAXSAMXMMMMAXMMMAAXMSMXSAXAXXMXMXMAMSXMASASAMXMASAAMAASXMMSSSSMSAMXMSXXMSX
XAMAAAXXXASASMMMMXMAAMAMMMMMAASXMAMXMMMAMXMASMMAMMMXAMSAMXAAMMMAXAXMMMASAXXASXSASXSSMXAMXSASXSSMSSMMXSMAMASAMXSAMMMMMSSMMSXAXXAAMXMASXMXAAMX
SASMSSSXMAAAXAAXXASXSSSMAAASMSMASMMMSASXSXMXXASMSAMMSXSASMMSMMSSSMSXXXMAXMXASAMAMAXAMXAMAMAMXAAXAAAMMAXXMASXMAMXSSXSXAXAXSMSSMSMMSXASAMXMASM
AXXAMAMMMXMSMSMMXMXAXAMXSMMSXAMMMAAAXASASMSSSMMXSXMAXXXXMMXMAMXAMAAMXMAAASMMMAMSMSAMXXAMXSASMSMMSSMMSASMMASMMXMSMXAMMMSXMXAMXMASXAMXSAMXSASA
AMMMMAMAMMXMAXAMSXMSMSMMMMAXXMSSSMMSSXMXMASAMSAMXMMSSSSMMSAMAMMAMXMSAMAMAXAMMXMXXXMMSSMSXSASAASAMXMAAAMAAXMXSAMSAMXMAXMMSMMMAXAMMMAMSMMXMASM
XMAAMASAMMAMAMAMAMXMAMXAMMAMAXXAMSAMMMMXMXMAMSMSAMXMAXAAASXSAXSAMAXSASASASXMXSSMMMSAAAAXXMMSXXSMMMMSSSMXSSMAMASXAMXSSSXAAAASMMMSAXSAMXMASAMX
MMSSSMSMSMXMASAMMXAMAMMXSXXAASMAMMXMSAMSSXSAMXAAMXXSSSMMMSAMAXMASXMXMSASAAAMMSAAMAMMSMXMXMAXMMXXSXAAAAXXXAMAMXMXXMXMMAMSSMMMXSAAMMXXMMSMSXMX
AXAAMXSAAMXMASXSXMXSAMXXMMMXMXMAMMMMMSAAXMASAMXMASXAXAXMXMXMSMSXMMMXXXAMXMASXSMMMSAMXMASMMXSAASAMMSSSMMMSXMXXMAMXMASXAXAMXSXXMAXMMMSMMAMMASX
SAMAMAMSMMAMXSXMASAMXSXMSASMMXSSSMAXAMMAMXSAMXXXXSAMXMXAAMAXMAMAAASMSXSAMSAMMSMSXMASASMSAXMAMSMAXAXMMXAMMASAXMAMXSASMMXMSASAXSMSMSMAAMXXSAMA
AMXXMMMAXSSSXMMMAMMSMAAASMMAMAMMAMSSXXXAMXMASMAMMMAXAXMSASAXSAMMSMSAMXXAMMMSAXAXXMASAMAXMSXMMXMMMSSMXXMAMSMASMMMMMASASAXMASAXXAAAMSSSMSMMASM
MXMASMSMMXMAXAAXXSXAMMXMSASMMAXXAMXAMMMMMXSAMMAMXSASXSAXMAMXSAMXMXMAMMMAMAAMXMSMASAMMMSMXMAXSXXMAMAXMASMSAMAMXAAASXMAMXXMXMXSAMMSMAXMAAAAAMX
AAAMMAAXMSMMMSSMMMXSSMXXXMMXSASMSSSMAAAAXMMASXXSAXXSMXMXMSMMXSMAXASAMAXXMMMSAMMAXMASMMMAAXSMSAMMSSMMAMAXAAMASMSSXSAMSMMMSMSAXAMAXMSMMSMMMSSX
SXXXMSMXMMASMXMMMAAMAAMSSMMAMMMAMAAMXSXXMAMAMMAMXMAXAXMSMMAMSMMXSMSXSMMAMXXAXMXXXSMMMAMXSXXAXMXMXAXXSXXXSXMXXMMMXMXMAAXSAAMXXAMXMAXAXAAXSMMM
AMMSMMXSASAMMASMMMSXMMMAAAMASAMSMSMMAXXMMSMMAMSMAAMXSXMAXMAMAAMXMMMMAMMMMMSMMMMMMMSASMSAMMMSMXMMSMMMMMMMXMASMSSMSSMSSSMSMSSMMSSSSSSSMMSMXAAS
MAXMAAASXMXSMAMXAAMXSAMSSMMXMAXXAXXMASASAAAMSAMXXSXAAAAMXSASMSMAAAXMASAAAAAAAXAXAAMMSAMASAMASASAAAAAAAAMASAMXAAAAMMAMAAXMAAAMAAXAXAAXAAMSMMS
SSXSMMMSXXASMMSSMXSASAXMMMXSAMXMSMMMSSMMSSSMXMASAAMXSMMXMAXMXXMSSMXSASMSMSSSMSXSMXMMMAMSMXSXSSMSSSXSSSSSMSAXMSMMMSMASMMMMSSMMMSMXMAMMMSXXAMX
`.trim();
  console.log(day4part2(graph));
}
