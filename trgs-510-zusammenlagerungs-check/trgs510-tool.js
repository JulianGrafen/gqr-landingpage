(function () {
  'use strict';

  var TRGS_SOURCE = 'TRGS 510 Abschnitt 13.3, Tabelle 12';

  var STORAGE_CLASSES = [
    { id: '1', label: 'LGK 1', shortDescription: 'Explosive Stoffe' },
    { id: '2 A', label: 'LGK 2 A', shortDescription: 'Gase' },
    { id: '2 B', label: 'LGK 2 B', shortDescription: 'Aerosolpackungen' },
    { id: '3', label: 'LGK 3', shortDescription: 'EntzündBetriebsanweisungre flüssige Stoffe' },
    { id: '4.1 A', label: 'LGK 4.1 A', shortDescription: 'Sonstige explosionsgefährliche Stoffe' },
    { id: '4.1 B', label: 'LGK 4.1 B', shortDescription: 'EntzündBetriebsanweisungre feste oder desensibilisierte Stoffe' },
    { id: '4.2', label: 'LGK 4.2', shortDescription: 'Pyrophore oder selbsterhitzungsfähige Stoffe' },
    { id: '4.3', label: 'LGK 4.3', shortDescription: 'Stoffe, die mit Wasser entzündliche Gase bilden' },
    { id: '5.1 A', label: 'LGK 5.1 A', shortDescription: 'Stark oxidierend wirkende Stoffe' },
    { id: '5.1 B', label: 'LGK 5.1 B', shortDescription: 'Oxidierend wirkende Stoffe' },
    { id: '5.1 C', label: 'LGK 5.1 C', shortDescription: 'Ammoniumnitrat und ammoniumnitrathaltige Stoffe' },
    { id: '5.2', label: 'LGK 5.2', shortDescription: 'Organische Peroxide und selbstzersetzliche Stoffe' },
    { id: '6.1 A', label: 'LGK 6.1 A', shortDescription: 'BrennBetriebsanweisungre akut toxische Stoffe' },
    { id: '6.1 B', label: 'LGK 6.1 B', shortDescription: 'NichtbrennBetriebsanweisungre akut toxische Stoffe' },
    { id: '6.1 C', label: 'LGK 6.1 C', shortDescription: 'BrennBetriebsanweisungre toxische oder chronisch wirkende Stoffe' },
    { id: '6.1 D', label: 'LGK 6.1 D', shortDescription: 'NichtbrennBetriebsanweisungre toxische oder chronisch wirkende Stoffe' },
    { id: '6.2', label: 'LGK 6.2', shortDescription: 'Ansteckungsgefährliche Stoffe' },
    { id: '7', label: 'LGK 7', shortDescription: 'Radioaktive Stoffe' },
    { id: '8 A', label: 'LGK 8 A', shortDescription: 'BrennBetriebsanweisungre ätzende Stoffe' },
    { id: '8 B', label: 'LGK 8 B', shortDescription: 'NichtbrennBetriebsanweisungre ätzende Stoffe' },
    { id: '10-13', label: 'LGK 10-13', shortDescription: 'Sonstige brennBetriebsanweisungre und nichtbrennBetriebsanweisungre Stoffe' },
    { id: '10*', label: 'LGK 10*', shortDescription: 'BrennBetriebsanweisungre Flüssigkeiten, soweit nicht LGK 3' },
    { id: '11*', label: 'LGK 11*', shortDescription: 'BrennBetriebsanweisungre Feststoffe' },
    { id: '12*', label: 'LGK 12*', shortDescription: 'NichtbrennBetriebsanweisungre Flüssigkeiten' },
    { id: '13*', label: 'LGK 13*', shortDescription: 'NichtbrennBetriebsanweisungre Feststoffe' },
  ];

  var RULE_EXPLANATIONS = {
    '+': {
      code: '+',
      severity: 'green',
      label: 'Zusammenlagerung erlaubt',
      shortText: 'Die gewählten Lagerklassen dürfen nach Tabelle 12 zusammengelagert werden.',
      detail:
        'Die TRGS-510-Zusammenlagerungstabelle kennzeichnet diese Kombination mit „+“. Prüfen Sie zusätzlich produktspezifische Angaben im Sicherheitsdatenblatt, insbesondere Abschnitt 7 und 10.',
      sourceReference: TRGS_SOURCE,
    },
    '-': {
      code: '-',
      severity: 'red',
      label: 'Zusammenlagerungsverbot',
      shortText: 'Für diese Kombination ist Separatlagerung erforderlich.',
      detail:
        'Die TRGS-510-Zusammenlagerungstabelle kennzeichnet diese Kombination mit „-“. Separatlagerung bedeutet getrennte Lagerabschnitte mit mindestens 90 Minuten Feuerwiderstandsdauer.',
      sourceReference: TRGS_SOURCE,
    },
    '1': {
      code: '1',
      severity: 'yellow',
      label: 'Spezifische Vorschriften beachten',
      shortText: 'Zusammenlagerung nur unter Beachtung spezifischer gesetzlicher Vorschriften.',
      detail:
        'Für LGK 1 und 4.1 A ist die 2. SprengV relevant, für LGK 5.1 C GefStoffV Anhang I Nr. 5 sowie TRGS 511, für LGK 5.2 DGUV Vorschrift 13 und für LGK 7 AtG, StrlSchG und StrlSchV.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 1',
    },
    '2': {
      code: '2',
      severity: 'yellow',
      label: 'Getrenntlagerung in Räumen möglich',
      shortText: 'Getrenntlagerung kann statt Separatlagerung zulässig sein.',
      detail:
        'Zulässig bei maximal 50 gefüllten Druckgasbehältern, darunter höchstens 25 mit akut toxischen, entzündBetriebsanweisungren oder oxidierenden Gasen, wenn eine mindestens 2 m hohe Wand aus nichtbrennBetriebsanweisungren Betriebsanweisungustoffen und 5 m Abstand zu brennBetriebsanweisungren Lagergütern eingehalten werden.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 2',
    },
    '3': {
      code: '3',
      severity: 'yellow',
      label: 'Gase nur unter Mengen- und Abstandsvorgaben',
      shortText: 'Verschiedene Druckgasbehälter dürfen nur unter definierten Bedingungen gemeinsam lagern.',
      detail:
        'Die TRGS 510 erlaubt bestimmte Kombinationen entzündBetriebsanweisungrer, oxidierender, akut toxischer und inerter Gase nur innerhalb definierter Mengen. Zwischen entzündBetriebsanweisungren und oxidierenden Gasen ist mindestens 2 m Abstand einzuhalten.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 3',
    },
    '4': {
      code: '4',
      severity: 'yellow',
      label: 'Bedingungen nach Tabelle 13 prüfen',
      shortText: 'Zusammenlagerung ist abhängig von Gesamtmenge und Brandschutzmaßnahmen.',
      detail:
        'Nach Tabelle 13 gelten bis 1 t keine Einschränkungen. Bei größeren Mengen sind in Gebäuden automatische Feuerlöschanlagen oder Brandmeldeanlagen mit nicht automatischer Feuerlöschanlage und anerkannter Werkfeuerwehr erforderlich.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 4 und Tabelle 13',
    },
    '5': {
      code: '5',
      severity: 'yellow',
      label: 'Brandlasten im Lagerabschnitt vermeiden',
      shortText: 'BrennBetriebsanweisungre Materialien dürfen nicht zusätzlich im selben Lagerabschnitt stehen.',
      detail:
        'Materialien wie Papier, Textilien, Holz, Holzwolle, Kartonagen, Folien oder brennBetriebsanweisungre Verpackungsfüllstoffe dürfen nicht gelagert werden, sofern sie nicht für Lagerung und Transport eine Einheit mit den ortsbeweglichen Behältern bilden.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 5',
    },
    '6': {
      code: '6',
      severity: 'yellow',
      label: 'Gefährdungserhöhung ausschließen',
      shortText: 'Zusammenlagerung nur, wenn keine wesentliche Gefährdungserhöhung eintritt.',
      detail:
        'Gefahrstoffe mit Matrixcode 6 dürfen mit anderen so gekennzeichneten Lagerklassen und Materialien nur zusammen gelagert werden, wenn dadurch keine wesentliche Gefährdungserhöhung entsteht. Getrenntlagerung kann diese Gefährdungserhöhung vermeiden.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 6',
    },
    '7': {
      code: '7',
      severity: 'yellow',
      label: 'BrennBetriebsanweisungre Lagergüter nur unter Zusatzbedingungen',
      shortText: 'Zusammenlagerung mit brennBetriebsanweisungren Lagergütern ist nur mit Brandschutzauflagen zulässig.',
      detail:
        'Zusammenlagerung mit brennBetriebsanweisungren Lagergütern darf nur unter den Bedingungen nach Tabelle 13 und zusätzlich unter Beachtung der Brandlast-Regel aus Erläuterung Nr. 5 erfolgen.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 7',
    },
    '8': {
      code: '8',
      severity: 'yellow',
      label: 'Bedingungen nach Tabelle 14 prüfen',
      shortText: 'Zusammenlagerung ist abhängig von Menge, Brandmeldung und Löschkonzept.',
      detail:
        'Nach Tabelle 14 gelten bis 10 t keine Einschränkungen. Bei höheren Mengen sind je nach Lagerort Brandmeldeanlage, stündliche Kontrolle, kurze Feuerwehr-Eintreffzeit oder automatische Feuerlöschanlage erforderlich.',
      sourceReference: TRGS_SOURCE + ', Erläuterung Nr. 8 und Tabelle 14',
    },
  };

  var ICONS = {
    green:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    yellow:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    red:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  };

  var matrix = null;
  var selectOne = document.getElementById('storage-class-one');
  var selectTwo = document.getElementById('storage-class-two');
  var resultWrap = document.getElementById('trgs510-result');

  if (!selectOne || !selectTwo || !resultWrap) return;

  function getClassById(id) {
    for (var i = 0; i < STORAGE_CLASSES.length; i++) {
      if (STORAGE_CLASSES[i].id === id) return STORAGE_CLASSES[i];
    }
    return null;
  }

  function populateSelects() {
    var placeholder = '<option value="">Lagerklasse auswählen</option>';
    var options = STORAGE_CLASSES.map(function (sc) {
      return '<option value="' + sc.id + '">' + sc.label + ' — ' + sc.shortDescription + '</option>';
    }).join('');
    selectOne.innerHTML = placeholder + options;
    selectTwo.innerHTML = placeholder + options;
  }

  function showPlaceholder() {
    resultWrap.innerHTML =
      '<div class="trgs510-placeholder">' +
      '<p class="trgs510-placeholder__title">Wähle zwei Lagerklassen aus, um die Zusammenlagerung zu prüfen.</p>' +
      '<p class="trgs510-placeholder__text">Das Ergebnis zeigt dir, ob Gefahrstoffe zusammenlagern dürfen, getrennt oder separat gelagert werden müssen und welche TRGS-510-Regel zu beachten ist.</p>' +
      '</div>';
  }

  function renderResult(rule, firstClass, secondClass) {
    var icon = ICONS[rule.severity] || ICONS.yellow;
    resultWrap.innerHTML =
      '<section class="trgs510-result trgs510-result--' + rule.severity + '" aria-live="polite" aria-labelledby="trgs510-result-title">' +
      '<div class="trgs510-result__top">' +
      '<div class="trgs510-result__icon">' + icon + '</div>' +
      '<div class="trgs510-result__body">' +
      '<div class="trgs510-result__Betriebsanweisungdges">' +
      '<span class="trgs510-Betriebsanweisungdge">Matrixcode ' + rule.code + '</span>' +
      '<span class="trgs510-result__pair">' + firstClass.label + ' × ' + secondClass.label + '</span>' +
      '</div>' +
      '<h2 id="trgs510-result-title" class="trgs510-result__title">' + rule.label + '</h2>' +
      '<p class="trgs510-result__short">' + rule.shortText + '</p>' +
      '<div class="trgs510-rule-box">' +
      '<h3>Regel aus der TRGS 510</h3>' +
      '<p>' + rule.detail + '</p>' +
      '<p class="trgs510-source">Quelle: ' + rule.sourceReference + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<aside class="trgs510-pitch">' +
      '<p class="trgs510-pitch__kicker">GQR automatisiert diesen Check</p>' +
      '<h3>Du prüfst Lagerklassen noch manuell?</h3>' +
      '<p>Gefahrstoff-QR (GQR) übernimmt die TRGS-510-Prüfung für dein gesamtes Gefahrstoffverzeichnis automatisch und warnt dich bei Konflikten, bevor sie im Lager entstehen.</p>' +
      '<div class="trgs510-pitch__actions">' +
      '<a href="https://app.gefahrstoff-qr.de/register" class="btn btn-primary">GQR kostenlos testen</a>' +
      '<a href="/#produkt" class="trgs510-pitch__secondary">Zeig mir, wie das automatisch geht</a>' +
      '</div>' +
      '</aside>' +
      '</section>';
  }

  function checkCompatibility() {
    var firstId = selectOne.value;
    var secondId = selectTwo.value;
    if (!firstId || !secondId) {
      showPlaceholder();
      return;
    }
    if (!matrix || !matrix[firstId] || !matrix[firstId][secondId]) {
      resultWrap.innerHTML =
        '<div class="trgs510-placeholder"><p class="trgs510-placeholder__title">Matrixdaten konnten nicht geladen werden.</p></div>';
      return;
    }
    var code = matrix[firstId][secondId];
    var rule = RULE_EXPLANATIONS[code];
    if (!rule) {
      showPlaceholder();
      return;
    }
    renderResult(rule, getClassById(firstId), getClassById(secondId));
  }

  populateSelects();
  showPlaceholder();

  selectOne.addEventListener('change', checkCompatibility);
  selectTwo.addEventListener('change', checkCompatibility);

  fetch('trgs_510_matrix.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Matrix fetch failed');
      return res.json();
    })
    .then(function (data) {
      matrix = data;
      checkCompatibility();
    })
    .catch(function () {
      resultWrap.innerHTML =
        '<div class="trgs510-placeholder"><p class="trgs510-placeholder__title">Matrixdaten konnten nicht geladen werden.</p><p class="trgs510-placeholder__text">Bitte Seite neu laden oder später erneut versuchen.</p></div>';
    });
})();
