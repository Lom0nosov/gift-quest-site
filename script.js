const siteContent = {
  girlName: "Любимая",
  relationshipStart: "2024-01-20",
  heroTitle: "Для самой любимой девочки",
  heroText:
    "Ты уже дошла до этого места, а значит впереди осталось только самое приятное.",
  wishText:
    "Пусть в этом году у тебя будет как можно больше спокойствия, поводов улыбаться и моментов, в которых ты чувствуешь себя любимой.",
  reasons: [
    "С тобой даже обычный день становится теплее.",
    "Ты умеешь одновременно быть нежной, сильной и очень настоящей.",
    "Мне нравится, как рядом с тобой все становится важнее и живее.",
    "Ты мой любимый человек, с которым хочется делить и радости, и планы, и тишину."
  ],
  letterLines: [
    "С днем рождения, моя хорошая.",
    "Я хотел сделать для тебя что-то не только красивое, но и личное. Что-то, в чем будет немного игры, немного воспоминаний и очень много тебя.",
    "Спасибо тебе за тепло, поддержку, смех, взгляды, разговоры и за то, что именно с тобой у меня связаны самые любимые моменты.",
    "Очень хочу, чтобы этот год приносил тебе радость, уверенность в себе и ощущение, что рядом всегда есть человек, который тебя очень любит."
  ],
  surpriseTitle: "Главный подарок совсем рядом",
  surpriseText:
    "Если ты читаешь это, значит ты прошла весь квест. Теперь посмотри туда, где я обычно прячу самое важное."
};

const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const reasonsRoot = document.getElementById("reasons");
const wishText = document.getElementById("wish-text");
const counter = document.getElementById("relationship-counter");
const letterLines = document.getElementById("letter-lines");
const surpriseTitle = document.getElementById("surprise-title");
const surpriseText = document.getElementById("surprise-text");
const letterSection = document.getElementById("letter-section");
const surpriseSection = document.getElementById("surprise-section");
const openLetterButton = document.getElementById("open-letter");
const openSurpriseButton = document.getElementById("open-surprise");

function pluralizeRu(value, forms) {
  const abs = Math.abs(value) % 100;
  const last = abs % 10;

  if (abs > 10 && abs < 20) {
    return forms[2];
  }

  if (last > 1 && last < 5) {
    return forms[1];
  }

  if (last === 1) {
    return forms[0];
  }

  return forms[2];
}

function getRelationshipDuration(startDateString) {
  const start = new Date(startDateString);
  const now = new Date();
  const diffMs = now - start;
  const dayMs = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(0, Math.floor(diffMs / dayMs));
  const months = Math.floor(totalDays / 30.44);
  const days = Math.round(totalDays - months * 30.44);

  return { months, days };
}

function renderReasons(items) {
  items.forEach((reason, index) => {
    const card = document.createElement("article");
    card.className = "reason";

    const label = document.createElement("span");
    label.className = "reason-index";
    label.textContent = `0${index + 1}`.slice(-2);

    const text = document.createElement("p");
    text.className = "reason-text";
    text.textContent = reason;

    card.append(label, text);
    reasonsRoot.append(card);
  });
}

function renderLetter(lines) {
  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    letterLines.append(paragraph);
  });
}

function renderDuration() {
  const { months, days } = getRelationshipDuration(siteContent.relationshipStart);
  counter.textContent = `${months} ${pluralizeRu(months, [
    "месяц",
    "месяца",
    "месяцев"
  ])} и ${days} ${pluralizeRu(days, ["день", "дня", "дней"])}`;
}

function fillContent() {
  document.title = `Для ${siteContent.girlName}`;
  heroTitle.textContent = siteContent.heroTitle;
  heroText.textContent = siteContent.heroText;
  wishText.textContent = siteContent.wishText;
  surpriseTitle.textContent = siteContent.surpriseTitle;
  surpriseText.textContent = siteContent.surpriseText;

  renderReasons(siteContent.reasons);
  renderLetter(siteContent.letterLines);
  renderDuration();
}

openLetterButton.addEventListener("click", () => {
  letterSection.classList.remove("hidden");
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

openSurpriseButton.addEventListener("click", () => {
  surpriseSection.classList.remove("hidden");
  surpriseSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

fillContent();
