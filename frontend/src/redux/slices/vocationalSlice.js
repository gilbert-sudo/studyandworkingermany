import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    "Arbeitest du gerne mit deinen Händen?",
    "Reparierst du gerne Dinge?",
    "Arbeitest du gerne draußen?",
    "Interessierst du dich für Maschinen?",
    "Baust oder bastelst du gerne etwas?",
    "Hilfst du gerne anderen Menschen?",
    "Hörst du anderen gerne zu?",
    "Arbeitest du gerne mit Kindern?",
    "Möchtest du Menschen gesund machen oder pflegen?",
    "Arbeitest du gerne im Team?",
    "Benutzt du gerne Computer?",
    "Lernst du gerne neue technische Dinge?",
    "Interessierst du dich für Elektronik?",
    "Löst du gerne Probleme?",
    "Arbeitest du gerne genau und sorgfältig?",
    "Zeichnest oder gestaltest du gerne?",
    "Fotografierst du gerne?",
    "Bist du kreativ?",
    "Hast du oft viele Ideen?",
    "Machst du gerne Musik oder Kunst?",
    "Sprichst du gerne mit Menschen?",
    "Kannst du andere gut überzeugen?",
    "Verkaufst du gerne etwas?",
    "Möchtest du später Verantwortung übernehmen?",
    "Organisierst du gerne Dinge?",
    "Arbeitest du gerne im Büro?",
    "Planst du gerne?",
    "Magst du Ordnung?",
    "Arbeitest du gerne mit Zahlen?",
    "Erledigst du Aufgaben zuverlässig?"
  ],
  statements: [
    "Ich arbeite gerne mit meinen Händen.",
    "Ich repariere gerne Dinge.",
    "Ich arbeite gerne draußen.",
    "Ich interessiere mich für Maschinen.",
    "Ich baue oder bastle gerne etwas.",
    "Ich helfe gerne anderen Menschen.",
    "Ich höre anderen gerne zu.",
    "Ich arbeite gerne mit Kindern.",
    "Ich möchte Menschen gesund machen oder pflegen.",
    "Ich arbeite gerne im Team.",
    "Ich benutze gerne Computer.",
    "Ich lerne gerne neue technische Dinge.",
    "Ich interessiere mich für Elektronik.",
    "Ich löse gerne Probleme.",
    "Ich arbeite gerne genau und sorgfältig.",
    "Ich zeichne oder gestalte gerne.",
    "Ich fotografiere gerne.",
    "Ich bin kreativ.",
    "Ich habe viele Ideen.",
    "Ich mache gerne Musik oder Kunst.",
    "Ich spreche gerne mit Menschen.",
    "Ich kann andere überzeugen.",
    "Ich verkaufe gerne etwas.",
    "Ich möchte später Verantwortung übernehmen.",
    "Ich organisiere gerne Dinge.",
    "Ich arbeite gerne im Büro.",
    "Ich plane gerne.",
    "Ich mag Ordnung.",
    "Ich arbeite gerne mit Zahlen.",
    "Ich erledige Aufgaben zuverlässig."
  ],
  categories: [
    {
      category: "Handwerk (Crafts & Trades)",
      jobs: [
        "Tischler:in (Carpenter)",
        "Maurer:in (Mason)",
        "Zimmerer:in (Carpenter/Joiner)",
        "Fliesenleger:in (Tiler)",
        "Maler:in (Painter)",
        "Bäcker:in (Baker)",
        "Steinmetz:in (Stonemason)",
        "Anlagenmechaniker:in für Sanitär-, Heizungs- und Klimatechnik (SHK) (HVAC Technician)"
      ]
    },
    {
      category: "Metall & Werkzeugmaschinenbau (Metalworking & Machine Construction)",
      jobs: [
        "Konstruktionsmechaniker/in (Construction Mechanic)",
        "Metallbauer/in (Metalworker)",
        "Maschinen- und Anlagenführer:in (Machine and Plant Operator)"
      ]
    },
    {
      category: "Elektrotechnik (Electrical Engineering)",
      jobs: [
        "Elektroniker (Electrician)",
        "Industrieelektriker/in (Industrial Electrician)",
        "Mechatroniker/in (Mechatronics Engineer)",
        "Elektroniker:in für Energie- und Gebäudetechnik (Electronics Technician for Energy and Building Technology)"
      ]
    },
    {
      category: "Baugewerbe (Civil Engineering & Construction)",
      jobs: [
        "Straßenbauer (Road Builder)",
        "Kanalbauer (Pipe Layer / Sewer Builder)",
        "Beton- und Stahlbetonbauer/in (Concrete and Reinforced Concrete Worker)",
        "Dachdecker:in (Roofer)"
      ]
    },
    {
      category: "Einzelhandel (Retail)",
      jobs: ["Retail professions and specialists"]
    },
    {
      category: "Hotellerie / Gastronomie (Hospitality & Catering)",
      jobs: ["Hotel and culinary professions"]
    },
    {
      category: "Pflegeberufe / Medizinischer Bereich (Healthcare & Nursing)",
      jobs: [
        "Pflegeberufe (Nursing professions)",
        "Berufe im medizinischen Bereich (Medical sector professions)",
        "Physiotherapeuten (Physiotherapists)"
      ]
    },
    {
      category: "Berufskraftfahrer/in (Professional Driver)",
      jobs: ["Commercial and heavy vehicle drivers"]
    },
    {
      category: "Kaufmännische Berufe (Commercial & Business Professions)",
      jobs: ["Business administration, clerical, and office management roles"]
    },
    {
      category: "Lagerlogistik (Warehouse Logistics)",
      jobs: [
        "Fachkraft für Lagerlogistik (Logistics Specialist)",
        "Fachlagerist (Warehouse Operator)"
      ]
    }
  ]
};

export const vocationalSlice = createSlice({
  name: 'vocational',
  initialState,
  reducers: {},
});

export default vocationalSlice.reducer;
