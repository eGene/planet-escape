const LAST_LEVEL = 'LAST_LEVEL';
const COLLECTED_GEMS = 'COLLECTED_GEMS';

export default {

    setLastLevel: function(level) {
        localStorage.setItem(LAST_LEVEL, level);
    },

    getLastLevel: function() {
        const level = localStorage.getItem(LAST_LEVEL);
        return level ? Number(level) : 1;
    },

    setLevelGems: function(level, gems) {
        let data = localStorage.getItem(COLLECTED_GEMS);
        let parsedData;

        try {
            parsedData = JSON.parse(data);
        } catch (err) {
            parsedData = {};
        }

        if (typeof parsedData !== 'object' || parsedData === null) {
            parsedData = {};
        }

        parsedData[level] = gems;
        localStorage.setItem(COLLECTED_GEMS, JSON.stringify(parsedData));
    },

    getLevelGems: function(level) {
        let data = localStorage.getItem(COLLECTED_GEMS);
        let parsedData;

        try {
            parsedData = JSON.parse(data);
        } catch (err) {
            parsedData = {};
        }

        if (typeof parsedData !== 'object' || parsedData === null) {
            parsedData = {};
        }

        return parsedData[level] || [];
    }

}
