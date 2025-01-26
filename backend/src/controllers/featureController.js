const unlockFeature = (req, res) => {
    const { featureId } = req.body;
    //todo logika odblokowania funkcji
    res.json({ message: `Feature ${featureId} unlocked successfully` });
};

module.exports = { unlockFeature };
