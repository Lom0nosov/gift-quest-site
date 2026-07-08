const siteContent = {
  girlName: "Полина",
  relationshipStart: "2025-03-15",
  heroTitle: "Для моей Заи",
  heroText:
    "Зай, если ты уже здесь, значит ты прошла весь мой маленький путь для тебя. Но самое теплое, нежное и важное я оставил напоследок.",
  videoSrc: "",
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
      description: "Если хочется чего-то комфортного, вкусного и идеально подходящего для нашего вечера."
    },
    {
      id: "burgers",
      title: "Бургеры",
      description: "Если хочется чего-то сочного, веселого и без лишней скромности."
    }
  ],
  surpriseTitle: "А теперь самое главное",
  surpriseText:
    "Если ты это открыла, значит ты прошла весь квест до конца. А теперь пришло время для главного подарка. Он уже совсем рядом."
};

const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const reasonsRoot = document.getElementById("reasons");
const wishText = document.getElementById("wish-text");
const counter = document.getElementById("relationship-counter");
const letterLines = document.getElementById("letter-lines");
const memoryVideo = document.getElementById("memory-video");
const videoPlaceholder = document.getElementById("video-placeholder");
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

function renderVideo() {
  if (!siteContent.videoSrc) {
    return;
  }

  memoryVideo.src = siteContent.videoSrc;
  memoryVideo.classList.remove("hidden");
  videoPlaceholder.classList.add("hidden");
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

  renderReasons(siteContent.reasons);
  renderLetter(siteContent.letterLines);
  renderVideo();
  renderFoodOptions(siteContent.foodOptions);
  renderDuration();
}

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
