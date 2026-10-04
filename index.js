const recipes = [
  {
    name: 'French Onion Soup',
    description: 'Rich beef broth with caramelized onions and melted cheese',
    rating: '4.7', reviews: '(267 reviews)', prep: '15 min', cook: '60 min', servings: '4 people',
    difficulty: 'Intermediate', cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'A bowl of soup garnished with herbs and seeds',
    ingredients: ['4 large onions, thinly sliced', '4 tablespoons butter', '1 liter beef broth', '1/2 cup white wine', '2 bay leaves', 'Fresh thyme', 'Baguette slices', '200g Gruyère cheese, grated'],
    instructions: ['Slice the onions thinly. Melt butter in a heavy pot over medium heat.', 'Cook the onions slowly, stirring often, until deeply golden and caramelized, about 40 minutes.', 'Add white wine and scrape up the browned bits. Simmer until reduced by half.', 'Pour in beef broth, add bay leaves and thyme, then simmer for 20 minutes.', 'Ladle into oven-safe bowls, top with baguette and Gruyère, and broil until bubbly and golden.'],
        nutrition: [['320 kcal', 'Calories'], ['16g', 'Protein'], ['34g', 'Carbohydrates'], ['14g', 'Fat'], ['4g', 'Fiber'], ['890mg', 'Sodium']],
    tip: 'Take your time caramelizing the onions. Low, slow heat builds the soup’s deep sweetness and rich color.'
  },
  {
    name: 'Creamy Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, and pancetta',
    rating: '4.8', reviews: '(234 reviews)', prep: '15 min', cook: '20 min', servings: '4 people', difficulty: 'Easy', cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1500&q=85', imageAlt: 'A bowl of freshly prepared spaghetti',
    ingredients: ['400g spaghetti pasta', '150g pancetta, diced', '2 large eggs + 2 egg yolks', '75g Pecorino Romano, grated', 'Freshly cracked black pepper'],
    instructions: ['Boil spaghetti in salted water until al dente. Reserve a mug of pasta water.', 'Fry pancetta until crisp, then turn off the heat.', 'Whisk eggs, yolks, cheese, and black pepper together.', 'Toss the pasta with pancetta, then stir in the egg mixture off the heat. Add pasta water until glossy.'],
    nutrition: [['520 kcal', 'Calories'], ['28g', 'Protein'], ['62g', 'Carbohydrates'], ['18g', 'Fat'], ['3g', 'Fiber'], ['680mg', 'Sodium']],
    tip: 'Take the pan off the heat before adding the eggs. The warmth makes a silky sauce without scrambling them.'
  },
  {
    name: 'Roasted Tomato & Burrata Pasta', description: 'Sweet roasted tomatoes, basil, and creamy burrata tossed with pasta',
    rating: '4.9', reviews: '(198 reviews)', prep: '10 min', cook: '30 min', servings: '4 people', difficulty: 'Easy', cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1500&q=85', imageAlt: 'Fresh pasta with tomatoes and herbs',
    ingredients: ['350g rigatoni pasta', '500g cherry tomatoes', '2 balls creamy burrata', '3 tablespoons olive oil', 'Fresh basil leaves'],
        instructions: ['Roast cherry tomatoes with olive oil, salt, and pepper until blistered.', 'Cook rigatoni in salted water until al dente. Save a little pasta water.', 'Toss the pasta with the roasted tomatoes and a splash of pasta water.', 'Tear burrata over the top, scatter with basil, and serve warm.'],
    nutrition: [['480 kcal', 'Calories'], ['21g', 'Protein'], ['58g', 'Carbohydrates'], ['17g', 'Fat'], ['5g', 'Fiber'], ['540mg', 'Sodium']],
    tip: 'A splash of balsamic vinegar over the tomatoes before roasting brings out their sweetness.'
  }
];

let currentRecipe = 0;
let activeTab = 'ingredients';
let toastTimer;
const byId = id => document.getElementById(id);

function showToast(message) {
  const toast = byId('toast');
  toast.textContent = message;
  toast.classList.add('show');
    clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderTab(tabName) {
  activeTab = tabName;
  const recipe = recipes[currentRecipe];
  const panel = byId('tab-content');

  if (tabName === 'ingredients') {
    panel.innerHTML = `<ol class="ingredient-list">${recipe.ingredients.map((item, index) => `<li><span class="ingredient-number">${index + 1}</span><span>${item}</span></li>`).join('')}</ol>`;
  } else if (tabName === 'instructions') {
    panel.innerHTML = `<ol class="instruction-list">${recipe.instructions.map(item => `<li>${item}</li>`).join('')}</ol>`;
  } else if (tabName === 'nutrition') {
    panel.innerHTML = `<div class="nutrition-grid">${recipe.nutrition.map(([value, label]) => `<div class="nutrition-item"><strong>${value}</strong><small>${label}</small></div>`).join('')}</div>`;
     } else {
    panel.innerHTML = `<p class="chef-tip">${recipe.tip}</p>`;
  }

  document.querySelectorAll('.tab').forEach(button => {
    const selected = button.dataset.tab === tabName;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
}

function renderRecipe() {
  const recipe = recipes[currentRecipe];
  byId('recipe-name').textContent = recipe.name;
  byId('recipe-description').textContent = recipe.description;
  byId('rating-score').textContent = recipe.rating;
  byId('rating-count').textContent = recipe.reviews;
  byId('prep-time').textContent = recipe.prep;
  byId('cook-time').textContent = recipe.cook;
    byId('servings').textContent = recipe.servings;
  byId('difficulty').textContent = recipe.difficulty;
  byId('cuisine').textContent = recipe.cuisine;
  byId('recipe-image').src = recipe.image;
  byId('recipe-image').alt = recipe.imageAlt;
  byId('time-warning').hidden = Number.parseInt(recipe.cook, 10) <= 45;
  renderTab(activeTab);
}

document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => renderTab(button.dataset.tab)));
byId('another-recipe').addEventListener('click', () => {
  currentRecipe = (currentRecipe + 1) % recipes.length;
  renderRecipe();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
byId('menu-button').addEventListener('click', () => {
  const menu = byId('mobile-menu');
  const isOpen = menu.classList.toggle('open');
  byId('menu-button').setAttribute('aria-expanded', String(isOpen));
});
byId('mobile-menu').querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  byId('mobile-menu').classList.remove('open');
  byId('menu-button').setAttribute('aria-expanded', 'false');
}));
byId('save-button').addEventListener('click', event => {
  const saved = event.currentTarget.classList.toggle('saved');
  event.currentTarget.setAttribute('aria-label', saved ? 'Remove saved recipe' : 'Save recipe');
  showToast(saved ? 'Recipe saved' : 'Recipe removed from saved');
});
byId('share-button').addEventListener('click', async () => {
  try {
    if (navigator.share) await navigator.share({ title: byId('recipe-name').textContent, url: window.location.href });
    else if (navigator.clipboard) { await navigator.clipboard.writeText(window.location.href); showToast('Recipe link copied'); }
      else showToast('Copy this page link to share the recipe');
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Could not share this recipe');
  }
});

renderRecipe();