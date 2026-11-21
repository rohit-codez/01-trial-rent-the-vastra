import json
import random

products = []
sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

designers = ['Sabyasachi Collection', 'Manish Malhotra', 'Anita Dongre', 'Tarun Tahiliani', 'Abu Jani Sandeep Khosla']

def make_product(id_num, title, category, gender, p_type, base_price, is_acc=False):
    slug = title.lower().replace(' ', '-')
    desc = f"Experience luxury with this exquisite {title}. Perfect for your next special occasion, crafted with the finest materials."
    r3 = base_price
    r5 = int(r3 * 1.5)
    r7 = r3 * 2
    sd = r3
    rp = r3 * 7
    color = title.split(' ')[0] if not is_acc else "Gold" # simplistic
    fabric = "Silk"
    work = "Embroidered"
    images = [f"https://images.unsplash.com/photo-{1595777457583 + id_num}?auto=format&fit=crop&q=80"]
    sz = sizes if not is_acc else ['Free Size']
    
    return {
        "id": f"prod-{id_num:03d}",
        "title": title,
        "slug": slug,
        "category": category,
        "subcategory": category,
        "gender": gender,
        "description": desc,
        "rentalPrice3Day": r3,
        "rentalPrice5Day": r5,
        "rentalPrice7Day": r7,
        "securityDeposit": sd,
        "retailPrice": rp,
        "fabric": fabric,
        "color": color,
        "workType": work,
        "occasionTags": ["Wedding", "Festive", "Reception"] if not is_acc else ["Wedding"],
        "images": images,
        "sizes": sz,
        "isAvailable": True,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviewCount": random.randint(10, 200),
        "designerName": random.choice(designers)
    }

items = [
    # Women
    ('Royal Crimson Bridal Lehenga', 'Lehenga', 'women', 5000),
    ('Pastel Pink Engagement Lehenga', 'Lehenga', 'women', 4000),
    ('Navy Blue Sangeet Lehenga', 'Lehenga', 'women', 3500),
    ('Emerald Green Mehendi Lehenga', 'Lehenga', 'women', 3000),
    ('Golden Champagne Reception Lehenga', 'Lehenga', 'women', 4500),
    ('Magenta Festive Lehenga', 'Lehenga', 'women', 2500),
    ('Wine Velvet Wedding Lehenga', 'Lehenga', 'women', 5500),
    ('Peach Floral Lehenga', 'Lehenga', 'women', 3000),
    ('Banarasi Silk Red Saree', 'Saree', 'women', 2500),
    ('Kanjeevaram Gold Temple Saree', 'Saree', 'women', 3000),
    ('Chiffon Sequin Party Saree', 'Saree', 'women', 2000),
    ('Organza Pastel Cocktail Saree', 'Saree', 'women', 2200),
    ('Tussar Silk Festival Saree', 'Saree', 'women', 1800),
    ('Emerald Velvet Gown', 'Gown', 'women', 3500),
    ('Blush Pink Reception Gown', 'Gown', 'women', 3800),
    ('Midnight Black Ball Gown', 'Gown', 'women', 4000),
    ('Ruby Red Evening Gown', 'Gown', 'women', 3200),
    ('Teal Dhoti Pants Set', 'Indo-Western', 'women', 2500),
    ('Burgundy Cape Lehenga', 'Indo-Western', 'women', 3000),
    ('Rose Gold Crop Top Skirt', 'Indo-Western', 'women', 2800),
    ('Deep Purple Anarkali', 'Anarkali', 'women', 2200),
    ('Mint Green Floor-Length Anarkali', 'Anarkali', 'women', 2400),
    ('Coral Embroidered Anarkali', 'Anarkali', 'women', 2000),
    ('Marigold Yellow Chaniya Choli', 'Festival Wear', 'women', 1500),
    ('Orange Bandhani Lehenga', 'Festival Wear', 'women', 1800),
    ('Turquoise Patola Suit', 'Festival Wear', 'women', 1600),
    ('Champagne Shimmer Gown', 'Cocktail Wear', 'women', 3000),
    ('Black Sequin Saree', 'Cocktail Wear', 'women', 2500),
    ('Silver Metallic Dress', 'Cocktail Wear', 'women', 2800),
    # Men
    ('Royal Ivory Wedding Sherwani', 'Sherwani', 'men', 4000),
    ('Midnight Blue Embroidered Sherwani', 'Sherwani', 'men', 3500),
    ('Gold Brocade Sherwani', 'Sherwani', 'men', 4500),
    ('Maroon Velvet Groom Sherwani', 'Sherwani', 'men', 4200),
    ('Sage Green Designer Sherwani', 'Sherwani', 'men', 3800),
    ('Navy Nehru Jacket Set', 'Indo-Western', 'men', 2000),
    ('Charcoal Asymmetric Kurta', 'Indo-Western', 'men', 1800),
    ('Ivory Jodhpuri Suit', 'Indo-Western', 'men', 2500),
    ('Black Premium Bandhgala', 'Bandhgala', 'men', 3000),
    ('Cream Silk Bandhgala', 'Bandhgala', 'men', 2800),
    ('Classic Black Tuxedo', 'Tuxedo', 'men', 3500),
    ('Midnight Blue Slim Tuxedo', 'Tuxedo', 'men', 3200),
    ('White Chikankari Kurta Set', 'Kurta Set', 'men', 1500),
    ('Pink Lucknowi Kurta Pajama', 'Kurta Set', 'men', 1600),
    ('Blue Handloom Cotton Kurta', 'Kurta Set', 'men', 1200),
    # Accessories
    ('Kundan Chandelier Earrings', 'Earrings', 'unisex', 500, True),
    ('Pearl Drop Earrings', 'Earrings', 'unisex', 400, True),
    ('Gold Bangles Set', 'Bracelets', 'unisex', 600, True),
    ('Polki Diamond Necklace Set', 'Necklaces', 'unisex', 800, True),
    ('Pearl Mala Necklace', 'Necklaces', 'unisex', 700, True),
    ('Embroidered Silk Potli Bag', 'Potli Bags', 'unisex', 300, True),
    ('Gold Sequin Box Clutch', 'Clutches', 'unisex', 400, True),
    ('Silk Wedding Safa', 'Safa', 'men', 500, True),
    ('Crystal Floral Brooch', 'Brooches', 'unisex', 200, True)
]

output = []
for i, item in enumerate(items):
    is_acc = len(item) == 5
    price = item[3]
    output.append(make_product(i+1, item[0], item[1], item[2], item[1], price, is_acc))

out_str = "import { Product } from '@/types/index';\n\nexport const products: Product[] = [\n"
for p in output:
    out_str += "  {\n"
    for k, v in p.items():
        if isinstance(v, str):
            out_str += f"    {k}: '{v}',\n"
        elif isinstance(v, list):
            if all(isinstance(x, str) for x in v):
                arr = ", ".join(f"'{x}'" for x in v)
                out_str += f"    {k}: [{arr}],\n"
            else:
                out_str += f"    {k}: {v},\n"
        elif isinstance(v, bool):
            out_str += f"    {k}: {'true' if v else 'false'},\n"
        else:
            out_str += f"    {k}: {v},\n"
    out_str += "  },\n"
out_str += "];\n"

with open(r"c:\Users\Rohit\Desktop\Rent The Vastra\src\data\products.ts", "w", encoding='utf-8') as f:
    f.write(out_str)
print("done")

