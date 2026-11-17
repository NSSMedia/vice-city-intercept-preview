(() => {
  "use strict";
  const get = id => document.getElementById(id);
  const states = [
    ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
    ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],
    ["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
    ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
    ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],
    ["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],
    ["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],
    ["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],
    ["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],
    ["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],
    ["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]
  ];
  const form = get("entryForm");
  const stateSelect = get("state");
  const answer = get("entryCode");
  const error = get("formError");
  const mobileCta = get("mobileCTA");
  states.forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    stateSelect.append(option);
  });
  answer.addEventListener("input", () => {
    answer.value = answer.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    error.textContent = "";
  });
  // Visual prototype: never sends requests or saves user data.
  form.addEventListener("submit", event => {
    event.preventDefault();
    const platform = form.querySelector('input[name="platform"]:checked');
    if (!/^[A-Z]{4}[0-9]{6}$/.test(answer.value)) {
      error.textContent = "Your code must be four letters followed by six numbers.";
      answer.focus(); return;
    }
    if (!get("firstName").value.trim() ||
        !get("lastName").value.trim() ||
        !get("email").value || !get("email").validity.valid ||
        !stateSelect.value || !platform ||
        !get("age").checked || !get("ack").checked) {
      error.textContent = "Complete the required fields, choose a platform and check both confirmations.";
      return;
    }
    error.textContent = "";
    form.reset();
    form.hidden = true;
    get("sampleReceipt").hidden = false;
    get("sampleReceipt").scrollIntoView({behavior:"smooth",block:"center"});
  });
  // A direct button handler keeps the preview consistent in embedded mobile browsers.
  form.querySelector(".form-submit").addEventListener("click", event => {
    event.preventDefault();
    form.requestSubmit();
  });

  get("restartDemo").addEventListener("click", () => {
    form.hidden = false;
    get("sampleReceipt").hidden = true;
    answer.focus();
  });
  let heroVisible = true;
  let entryVisible = false;
  const syncCta = () => mobileCta.classList.toggle("visible", !heroVisible && !entryVisible);
  if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting; syncCta();
    }, {threshold:.02});
    const entryObserver = new IntersectionObserver(([entry]) => {
      entryVisible = entry.isIntersecting; syncCta();
    }, {threshold:.03});
    heroObserver.observe(document.querySelector(".hero"));
    entryObserver.observe(get("enter"));
  }
  const menuToggle = get("menuToggle");
  const mobileNav = get("mobileNav");
  menuToggle.addEventListener("click", () => {
    const expanding = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(expanding));
    menuToggle.setAttribute("aria-label", expanding ? "Close navigation" : "Open navigation");
    mobileNav.hidden = !expanding;
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      mobileCta.classList.remove("visible");
      mobileNav.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
})();