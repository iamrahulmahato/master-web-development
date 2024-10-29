from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


class BloomFilter:
    def __init__(self, size, num_hashes):
        self.size = size
        self.num_hashes = num_hashes
        self.bit_array = [0] * size

    def _hashes(self, element):
        return [hash(element + str(i)) % self.size for i in range(self.num_hashes)]

    def add(self, element):
        for index in self._hashes(element):
            self.bit_array[index] = 1

    def check(self, element):
        return all(self.bit_array[index] == 1 for index in self._hashes(element))

    def get_bit_array(self):
        return self.bit_array


# Initialize a Bloom filter
bloom_filter = BloomFilter(size=10, num_hashes=3)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add", methods=["POST"])
def add_element():
    data = request.get_json()
    bloom_filter.add(data["element"])
    return jsonify({"bitArray": bloom_filter.get_bit_array()})


@app.route("/check", methods=["POST"])
def check_element():
    data = request.get_json()
    exists = bloom_filter.check(data["element"])
    return jsonify({"exists": exists})


if __name__ == "__main__":
    app.run(debug=True)
