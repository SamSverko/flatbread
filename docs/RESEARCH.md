# research

## Quotes

[Inspirational food-related quotes](https://www.huffingtonpost.ca/entry/food-quotes-famous-eating_n_2481583?ri18n=true)

## Fractions

- ↉ = 0
- ⅒ = 0.1
- ⅑ = 0.111
- ⅛ = 0.125
- ⅐ = 0.142
- ⅙ = 0.167
- ⅕ = 0.2
- ¼ = 0.25
- ⅓ = 0.333
- ⅜ = 0.375
- ⅖ = 0.4
- ½ = 0.5
- ⅗ = 0.6
- ⅝ = 0.625
- ⅔ = 0.667
- ¾ = 0.75
- ⅘ = 0.8
- ⅚ = 0.833
- ⅞ = 0.875

↉, ⅒, ⅑, ⅛, ⅐, ⅙, ⅕, ¼, ⅓, ⅜, ⅖, ½, ⅗, ⅝, ⅔, ¾, ⅘, ⅚, ⅞

## Using Flipp's website to get local flyer data

- [Get flyers based on postal code](https://gateflipp.flippback.com/bf/flipp/data?locale=en-ca&postal_code=M5A3X2)
- [Once you have the postal code, use the store id to get that store flyers](https://gateflipp.flippback.com/bf/flipp/flyers/3278188)
- [If you want to look at a flyer on your browser](https://flipp.com/en-ca/smithville-on/flyer/3278188-fortinos-weekly-flyer?postal_code=M5A3X2)

---

## Stack overflow

[Scraping web flyer data using python](https://stackoverflow.com/questions/46650484/scraping-a-web-flyer)
(Just in case the posts ever gets deleted, I've copied the answer below)

`https://backflipp.wishabi.com/flipp/items/search?locale=[Your Language preference here]&postal_code=[Your postal code here]&q=[Your merchant here]`
In this example you will get all items (description, price, image etc..) from all valid flyers from Walmart in in the area of H4A1B9 postal code

`https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=H4A1B9&q=Walmart`
In this example you will search at Walmart for a specific item

`https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=H4A1B9&q=Walmart AND milk`

Looks like this link format could be a great starting point:
`https://backflipp.wishabi.com/flipp/items/search?locale=en&postal_code=H4A1B9&q=walmart`

This link returns a nicely formatted json object (we can use JavaScript to manipulate it for the page, no need for Python). We can get the item name, listed price, when the sale takes place, image, etc.

I also tested this link, where the first item is onions on sale for 3.47 until May 30th. I then went to the normal Flipp site and the walmart flyer confirmed this sale, so the link is accurate!

---

## Recipes collection schema setup notes

While MongoDB allows for a flexible schema, it makes sense to do some research on common recipe categories to better organize recipes as they come in.

### All Recipes

#### Meal type

- Dessert
- Breakfast & brunch
- Dinner
- Lunch

#### Diet and health

We won't have the information for this, for the first version at least.

- Diabetic
- Low carb
- Dairy-free
- Gluten free
- Healthy
- Heart-healthy
- High fiber
- Low calorie
- Low cholesterol
- Low fat
- Weight-loss

#### Ingredient

- List of basic ingredients (chicken, beef, apple, etc.)

#### Dish type

- Appetizer & snack
- Bread
- Cake
- Candy & fudge
- Casserole
- Christmas cookie
- Cocktail
- Cookie
- Mac and cheese
- Main
- Pasta salad
- Pasta
- Pie
- Pizza
- Sandwich
- Sauces & condiment
- Smoothie
- Soup, stew & chili

#### World cuisine

- Chinese
- Indian
- Italian
- Mexican
- Southern
- Thai

#### Cooking style

- BBQ & grilling
- Budget cooking
- Clean-eating
- Cooking for kids
- Cooking for two
- Gourmet
- Paleo
- Pressure cooker
- Quick & easy
- Slow cooker
- Vegan
- Vegetarian

### Epicurious

#### Meal & course

- Dinner
- Dessert
- Appetizer
- Side
- Breakfast
- Lunch
- Brunch
- Buffet

#### Dish types

- Aperitif
- Biscuit
- Bread
- Brownie
- Burrito
- Cake
- Candy
- Casserole & gratin
- Cheesecake
- Chili
- Chowder
- Cobbler & crumble
- Cocktail
- Condiment & spread
- Cookie
- Cranberry sauce
- Crepe
- Cupcake
- Custard
- Digestif
- Dip
- Edible gift
- Flat bread (hehe)
- Frittata
- Fritter
- Frozen dessert
- Guacamole
- Hamburger
- Ice cream
- Iced tea
- Margarita
- Martini
- Pastry
- Salad
- Salad dressing
- Sandwich
- Sangria
- Sauce
- Soup & stew
- Stuffing & dressing

#### Dietary concerns

- Healthy
- High fiber
- Kid friendly
- Kosher
- Kosher for passover
- Low cholesterol
- Low fat
- Low sodium
- Low & no sugar
- Organic
- Quick & easy
- Raw
- Vegan
- Vegetarian
- Wheat & gluten-free

#### Ingredients

- List of basic ingredients (chicken, beef, apple, etc.)

#### Cuisine

- African
- American
- Asian
- British
- Cajun & creole
- Californian
- Caribbean
- Central & south american
- Chinese
- Cuban
- Eastern european
- English
- French
- German
- Indian
- Irish
- Italian
- Italian american
- Japanese
- Korean
- Latin american
- Mediterranean
- Mexican
- Middle eastern
- Moroccan
- Nuevo latino
- Scandinavian
- South american
- South asian
- Southeast asian
- Southern
- Southwestern
- Spanish & portuguese
- Tex-mex
- Thai
- Turkish
- Vietnamese

#### Technique

- Advance prep required
- Bake
- Barbecue
- Boil
- Braise
- Brine
- Broil
- Chill
- Deep fry
- Freeze
- Fry
- Marinate
- No-cook
- Pan-fry
- Poach
- Roast
- Sauté
- Simmer
- Steam
- Stew
- Stir-fry

### Bon Apetit

#### Meal & courses

- Appetizer
- Breakfast
- Brunch
- Cocktail
- Dessert
- Dinner
- Lunch
- Side

#### Dietary concern

- Vegetarian
- Vegan
- Gluten-free
- Healthyish
