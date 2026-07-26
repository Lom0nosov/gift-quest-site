const siteContent = {
  girlName: "Полина",
  relationshipStart: "2025-03-15",
  // То, что должно получиться на картинке из 5 карточек.
  // Можно менять — только не забудь написать то же самое на карточках.
  unlockAnswer: "я тебя люблю",
  heroTitle: "Для моей Заи",
  heroText:
    "Зай, если ты уже здесь, значит ты прошла весь мой маленький путь для тебя. Но самое теплое, нежное и важное я оставил напоследок.",
  wishText:
    "Я очень хочу, чтобы этот год дарил тебе много спокойствия, легкости, уверенности в себе и моментов, в которых ты чувствуешь, как сильно тебя любят.",
  reasons: [
    "С тобой даже самый обычный день становится особенным и по-настоящему теплым.",
    "Ты умеешь быть нежной, красивой, веселой и очень настоящей одновременно.",
    "Рядом с тобой хочется улыбаться чаще, стараться сильнее и просто быть лучше.",
    "Ты тот человек, с которым мне хочется делить и радость, и тишину, и все важные моменты жизни."
  ],
  letterLines: [
    "С днем рождения, Зай.",
    "Мне хотелось сделать для тебя не просто подарок, а что-то по-настоящему личное. Что-то, в чем будет немного игры, немного наших воспоминаний и очень много чувств к тебе.",
    "Спасибо тебе за тепло, за твою улыбку, за твою нежность, за моменты рядом и за то, что именно с тобой у меня связано столько любимых воспоминаний.",
    "Я очень хочу, чтобы ты была счастлива, чаще улыбалась, чувствовала себя любимой и всегда знала, как много ты для меня значишь."
  ],
  foodOptions: [
    {
      id: "rolls",
      title: "Роллы",
      description: "Что-то нежное, уютное и вкусное под хороший вечер."
    },
    {
      id: "pizza",
      title: "Пицца",
      description:
        "Если хочется чего-то комфортного, вкусного и идеально подходящего для нашего вечера."
    },
    {
      id: "burgers",
      title: "Бургеры",
      description: "Если хочется чего-то сочного, веселого и без лишней скромности."
    }
  ],
  surpriseTitle: "А теперь самое главное",
  surpriseText:
    "Если ты это открыла, значит ты прошла весь квест до конца. А теперь пришло время для главного подарка. Он уже совсем рядом.",
  riddles: [
    {
      number: "01",
      title: "Первая карточка",
      hint: "Там, где на кухне тихо лежит то, что ты купила «на пользу», а потом почти забыла."
    },
    {
      number: "02",
      title: "Вторая карточка",
      hint: "След ведёт туда, где волосы становятся красивее перед особенным днём."
    },
    {
      number: "03",
      title: "Третья карточка",
      hint: "Загляни за тех круглых героев, которые всегда рядом и немного волшебные."
    },
    {
      number: "04",
      title: "Четвёртая карточка",
      hint: "Она ждёт за мирами и приключениями, которые живут в маленьких картриджах."
    },
    {
      number: "05",
      title: "Пятая карточка",
      hint: "Последняя спрятана там, где обычно лежит то, чем платят за вкусные вечера."
    }
  ]
};

const STORAGE_KEY = "gift-quest-unlocked";

const questGate = document.getElementById("quest-gate");
const mainSite = document.getElementById("main-site");
const riddlesRoot = document.getElementById("riddles");
const unlockForm = document.getElementById("unlock-form");
const unlockInput = document.getElementById("unlock-input");
const unlockError = document.getElementById("unlock-error");

const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const reasonsRoot = document.getElementById("reasons");
const wishText = document.getElementById("wish-text");
const counter = document.getElementById("relationship-counter");
const letterLines = document.getElementById("letter-lines");
const foodOptionsRoot = document.getElementById("food-options");
const foodResult = document.getElementById("food-result");
const foodResultText = document.getElementById("food-result-text");
const surpriseTitle = document.getElementById("surprise-title");
const surpriseText = document.getElementById("surprise-text");
const letterSection = document.getElementById("letter-section");
const letterEnvelope = document.getElementById("letter-envelope");
const surpriseSection = document.getElementById("surprise-section");
const openLetterButton = document.getElementById("open-letter");
const openSurpriseButton = document.getElementById("open-surprise");

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]/gi, "");
}

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
  const [year, month, day] = startDateString.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());
  let days = today.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days = previousMonth.getDate() + days;
  }

  return {
    months: Math.max(0, months),
    days: Math.max(0, days)
  };
}

function renderRiddles(items) {
  items.forEach((riddle, index) => {
    const card = document.createElement("article");
    card.className = "riddle";
    card.style.animationDelay = `${index * 90}ms`;

    const number = document.createElement("span");
    number.className = "riddle-number";
    number.textContent = riddle.number;

    const title = document.createElement("h3");
    title.className = "riddle-title";
    title.textContent = riddle.title;

    const hint = document.createElement("p");
    hint.className = "riddle-hint";
    hint.textContent = riddle.hint;

    card.append(number, title, hint);
    riddlesRoot.append(card);
  });
}

function renderReasons(items) {
  items.forEach((reason, index) => {
    const card = document.createElement("article");
    card.className = "reason";
    card.style.animationDelay = `${index * 90}ms`;

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

function renderFoodOptions(items) {
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "food-option button";
    button.style.animationDelay = `${item.id.length * 40}ms`;
    button.dataset.foodId = item.id;

    const title = document.createElement("span");
    title.className = "food-option-title";
    title.textContent = item.title;

    const text = document.createElement("p");
    text.className = "food-option-text";
    text.textContent = item.description;

    button.append(title, text);
    button.addEventListener("click", () => {
      foodOptionsRoot.querySelectorAll(".food-option").forEach((option) => {
        option.classList.remove("is-selected");
      });

      button.classList.add("is-selected");
      foodResult.classList.remove("hidden");
      foodResult.classList.remove("is-visible");
      foodResultText.textContent = `Тогда сегодня будет ${item.title.toLowerCase()}. Отличный выбор, я все устрою.`;
      requestAnimationFrame(() => {
        foodResult.classList.add("is-visible");
      });
      foodResult.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    foodOptionsRoot.append(button);
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

  renderRiddles(siteContent.riddles);
  renderReasons(siteContent.reasons);
  renderLetter(siteContent.letterLines);
  renderFoodOptions(siteContent.foodOptions);
  renderDuration();
}

function unlockSite({ scroll = true } = {}) {
  questGate.classList.add("quest-gate-done");
  questGate.innerHTML = `
    <p class="eyebrow">Квест пройден</p>
    <h2 class="section-title">Ты нашла все карточки</h2>
    <p class="muted">Теперь можно смотреть дальше — самое тёплое уже открыто.</p>
  `;
  mainSite.classList.remove("hidden");
  mainSite.classList.add("main-site-visible");
  localStorage.setItem(STORAGE_KEY, "1");

  if (scroll) {
    mainSite.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function tryUnlock(rawValue) {
  const expected = normalizeAnswer(siteContent.unlockAnswer);
  const actual = normalizeAnswer(rawValue);

  if (!actual || actual !== expected) {
    unlockError.classList.remove("hidden");
    unlockInput.classList.add("unlock-input-error");
    unlockInput.focus();
    return false;
  }

  unlockError.classList.add("hidden");
  unlockInput.classList.remove("unlock-input-error");
  unlockSite();
  return true;
}

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  tryUnlock(unlockInput.value);
});

unlockInput.addEventListener("input", () => {
  unlockError.classList.add("hidden");
  unlockInput.classList.remove("unlock-input-error");
});

openLetterButton.addEventListener("click", () => {
  letterSection.classList.remove("hidden");
  letterSection.classList.remove("letter-section-visible");
  void letterEnvelope.offsetWidth;
  letterSection.classList.add("letter-section-visible");
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

openSurpriseButton.addEventListener("click", () => {
  surpriseSection.classList.remove("hidden");
  surpriseSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

fillContent();

if (localStorage.getItem(STORAGE_KEY) === "1") {
  unlockSite({ scroll: false });
}
