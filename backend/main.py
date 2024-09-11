from flask import request, jsonify
from config import app, db
from models import FoodItem

@app.route("/inventory", methods=["GET"])
def get_inventory():
    inventory = FoodItem.query.all()
    json_inventory = list(map(lambda x: x.to_json(), inventory))
    return jsonify({"inventory": json_inventory})

@app.route("/create_fooditem", methods=["POST"])
def create_foodItem():
    name = request.json.get("name")
    quantity = request.json.get("quantity")

    if not name or quantity is None:
        return jsonify({"message": "You must include a name and quantity"}), 400
    
    new_foodItem = FoodItem(name=name, quantity=quantity)
    try: 
        db.session.add(new_foodItem)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Food Item Created"}), 201

@app.route("/update_fooditem/<int:item_id>", methods=["PATCH"])
def update_fooditem(item_id):
    foodItem = FoodItem.query.get(item_id)

    if not foodItem:
        return jsonify({"message": "Food Item not found"}), 404
    
    data = request.json
    foodItem.name = data.get("name", foodItem.name)
    foodItem.quantity = data.get("quantity", foodItem.quantity)

    db.session.commit()

    return jsonify({"message": "Food Item updated"}), 200

@app.route("/delete_fooditem/<int:item_id>", methods=["DELETE"])
def delete_fooditem(item_id):
    foodItem = FoodItem.query.get(item_id)

    if not foodItem:
        return jsonify({"message": "Food Item not found"}), 404
    
    db.session.delete(foodItem)
    db.session.commit()

    return jsonify({"message": "Food Item Deleted"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
