const getPersonalizations = async (req, res) => {
    try {
        res.json({
            items: [
                { id: 1, name: 'Avatar Pack', cost: 100 },
                { id: 2, name: 'Background Theme', cost: 200 },
            ],
        });
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch personalizations' });
    }
};

const purchasePersonalization = (req, res) => {
    const { itemId } = req.body;
    //todo logika zakupu personalizacji
    res.json({ message: `Item ${itemId} purchased successfully` });
};

module.exports = { getPersonalizations, purchasePersonalization };
