export default function isCounty(countrie) {
    // english list is from britannica.com on the 04.feb.2024: https://www.britannica.com/topic/list-of-countries-1993160
    const knownCountriesEnglish = ["algeria", "antigua and barbuda", "argentina", "armenia", "australia", "austria", "azerbaijan", "the bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria", "burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad", "chile", "china", "colombia", "comoros", "congo, democratic republic of the", "congo, republic of the", "costa rica", "côte d’ivoire", "croatia", "cuba", "cyprus", "czech republic", "denmark", "djibouti", "dominica", "dominican republic", "east timor (timor-leste)", "ecuador", "egypt", "el salvador", "equatorial guinea", "eritrea", "estonia", "eswatini", "ethiopia", "fiji", "finland", "france", "gabon", "the gambia", "georgia", "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau", "guyana", "haiti", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati", "korea, north", "korea, south", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania", "mauritius", "mexico", "micronesia, federated states of", "moldova", "monaco", "mongolia", "montenegro", "morocco", "mozambique", "myanmar (burma)", "namibia", "nauru", "nepal", "netherlands", "new zealand", "nicaragua", "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau", "panama", "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda", "saint kitts and nevis", "saint lucia", "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia", "south africa", "spain", "sri lanka", "sudan", "sudan, south", "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan", "vanuatu", "vatican city", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"]
    // norweginan list is from wikipedia.org on the 09.feb.2024: https://no.wikipedia.org/wiki/Liste_over_land_etter_areal
    const knownCountriesNorwegian = ["russland", "canada", "usa", "kina", "brasil", "australia", "eu", "india", "argentina", "kasakhstan", "algerie", "den demokratiske republikken kongo", "grønland", "saudi-arabia", "mexico", "indonesia", "sudan", "libya", "iran", "mongolia", "peru", "tsjad", "niger", "angola", "mali", "sør-afrika", "colombia", "etiopia", "bolivia", "mauritania", "egypt", "tanzania", "nigeria", "venezuela", "pakistan", "namibia", "mosambik", "tyrkia", "chile", "zambia", "burma", "afghanistan", "sør-sudan", "frankrike", "somalia", "den sentralafrikanske republikk", "ukraina", "botswana", "madagaskar", "kenya", "jemen", "thailand", "spania", "turkmenistan", "kamerun", "papua ny-guinea", "sverige", "usbekistan", "marokko", "irak", "paraguay", "zimbabwe", "norge", "svalbard", "jan mayen", "japan", "tyskland", "republikken kongo", "finland", "malaysia", "vietnam", "elfenbenskysten", "polen", "oman", "italia", "filippinene", "ecuador", "burkina faso", "new zealand", "gabon", "vest-sahara", "guinea", "storbritannia", "ghana", "romania", "laos", "uganda", "guyana", "belarus", "kirgisistan", "senegal", "syria", "kambodsja", "uruguay", "tunisia", "surinam", "nepal", "bangladesh", "tadsjikistan", "hellas", "nicaragua", "eritrea" ,"nord-korea", "malawis", "benin", "honduras", "liberia", "bulgaria", "cuba", "guatemala", "island", "sør-korea", "ungarn", "portugal", "jordan", "aserbajdsjan", "østerrike", "de forente arabiske emirater", "tsjekkia", "panama", "serbia", "sierra leone", "irland", "georgia", "sri lanka", "litauen", "latvia", "togo", "kroatia", "bosnia-hercegovina", "costa rica", "slovakia", "den dominikanske republikk", "bhutan", "estland", "danmark", "nederland", "sveits", "guinea-bissau", "taiwan", "moldova", "belgia", "lesotho", "armenia", "albania", "salomonøyene", "ekvatorial-guinea", "burundi", "haiti", "rwanda", "nord-makedonia", "djibouti", "belize", "el salvador", "israel", "slovenia", "ny-caledonia", "fiji", "kuwait", "eswatini", "øst-timor", "montenegro", "bahamas", "puerto rico", "vanuatu", "falklandsøyene", "qatar", "gambia", "jamaica", "kosovo", "libanon", "kypros", "palestina", "brunei","trinidad og tobago", "fransk polynesia", "são tomé og príncipe", "saint vincent og grenadinene", "saint-pierre og miquelon", "saint kitts og nevi","wallis- og futunaøyene",	"turks- og caicosøyene", "st. helena", "de amerikanske jomfruøyer", "de nederlandske antiller", "antigua og barbuda", "de britiske jomfruøyer", "saint lucia", "nord-marianene", "kapp verde", "amerikansk samoa", "saint-barthélemy", "san marino", "saint martin", "samoa", "luxembourg", "komorene", "mauritius", "færøyene", "hongkong", "kiribati", "dominica", "tonga", "mikronesiaføderasjonen", "singapore", "bahrain", "man", "guam", "andorra", "palau", "seychellene", "barbados", "mayotte", "gaza", "grenada", "malta", "maldivene", "caymanøyene","niue", "cookøyene", "aruba", "marshalløyene", "liechtenstein", "christmasøya", "dhekelia", "akrotiri", "jersey", "anguilla", "montserrat", "guernsey", "bermuda", "pitcairnøyene", "norfolkøya", "macao", "tuvalu", "nauru", "kokosøyene", "tokelau", "gibraltar", "monaco", "vatikanstaten"]
    
    const knownCountries = [...knownCountriesEnglish, ...knownCountriesNorwegian ]

    return knownCountries.includes(countrie.trim().toLowerCase())
}

