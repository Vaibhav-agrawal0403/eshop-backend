class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
        ? {
            name: {
                $regex: this.queryStr.keyword, // $regex is used to search keyword in mongodb, $ is mongodb operator
                $options: "i" , // i is used for case insensitive , if someone search ABC then it will search abc also
            },
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr}; // ...this.queryStr actual copy the queryStr if we used = queryStr then it will be by refernce. if we do any changes then it will reflect to queryStr so used ...this.queryStr to overcome this.
        // Removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // filter for Price and Rating


        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr)

        return this;
    }

    pagination(resultPerPage){
        const currentPage = this.queryStr.page || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures