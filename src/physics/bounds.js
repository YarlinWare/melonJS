/**
 * @classdesc
 * a bound object contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
 * @class Bounds
 * @memberOf me
 * @constructor
 * @memberOf me
 * @param {me.Vector2d[]} [vertices] an array of me.Vector2d points
 * @return {me.Bounds} A new bounds object
 */

class Bounds {

    constructor(vertices) {
        this.min = { x: Infinity,  y: Infinity };
        this.max = { x: -Infinity, y: -Infinity };

        if (typeof vertices !== "undefined") {
            this.update(vertices);
        }
    }

    /**
     * reset the bound
     * @name clear
     * @memberOf me.Bounds
     * @function
     */
    clear() {
        this.setMinMax(Infinity, Infinity, -Infinity, -Infinity);
    }

    /**
     * sets the bounds to the given min and max value
     * @name setMinMax
     * @memberOf me.Bounds
     * @function
     * @param {Number} minX
     * @param {Number} minY
     * @param {Number} maxX
     * @param {Number} maxY
     */
    setMinMax(minX, minY, maxX, maxY) {
        this.min.x = minX;
        this.min.y = minY;

        this.max.x = maxX;
        this.max.y = maxY;
    }

    /**
     * x position of the bound
     * @public
     * @type {Number}
     * @name x
     * @memberOf me.Bounds
     */
    get x() {
        return this.min.x;
    }

    set x(value) {
        var deltaX = this.max.x - this.min.x;
        this.min.x = value;
        this.max.x = value + deltaX;
    }

    /**
     * y position of the bounds
     * @public
     * @type {Number}
     * @name y
     * @memberOf me.Bounds
     */
    get y() {
        return this.min.y;
    }

    set y(value) {
        var deltaY = this.max.y - this.min.y;

        this.min.y = value;
        this.max.y = value + deltaY;
    }

    /**
     * width of the bounds
     * @public
     * @type {Number}
     * @name width
     * @memberOf me.Bounds
     */
    get width() {
        return this.max.x - this.min.x;
    }

    set width(value) {
        this.max.x = this.min.x + value;
    }

    /**
     * width of the bounds
     * @public
     * @type {Number}
     * @name width
     * @memberOf me.Bounds
     */
    get height() {
        return this.max.y - this.min.y;
    }

    set height(value) {
        this.max.y = this.min.y + value;
    }


    /**
     * Updates bounds using the given vertices
     * @name update
     * @memberOf me.Bounds
     * @function
     * @param {me.Vector2d[]} vertices an array of me.Vector2d points
     */
    update(vertices) {
        this.add(vertices, true);
    }

    /**
     * add the given vertices to the bounds definition.
     * @name add
     * @memberOf me.Bounds
     * @function
     * @param {me.Vector2d[]} vertices an array of me.Vector2d points
     * @param {boolean} [clear=false] either to reset the bounds before adding the new vertices
     */
    add(vertices, clear = false) {
        if (clear === true) {
            this.clear();
        }
        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > this.max.x) this.max.x = vertex.x;
            if (vertex.x < this.min.x) this.min.x = vertex.x;
            if (vertex.y > this.max.y) this.max.y = vertex.y;
            if (vertex.y < this.min.y) this.min.y = vertex.y;
        }
    }

    /**
     * add the given bounds to the bounds definition.
     * @name addBounds
     * @memberOf me.Bounds
     * @function
     * @param {me.Bounds} bounds
     * @param {boolean} [clear=false] either to reset the bounds before adding the new vertices
     */
    addBounds(bounds, clear = false) {
        if (clear === true) {
            this.clear();
        }

        if (bounds.max.x > this.max.x) this.max.x = bounds.max.x;
        if (bounds.min.x < this.min.x) this.min.x = bounds.min.x;
        if (bounds.max.y > this.max.y) this.max.y = bounds.max.y;
        if (bounds.min.y < this.min.y) this.min.y = bounds.max.y;
    }

    /**
     * Returns true if the bounds contains the given point.
     * @name contains
     * @memberOf me.Bounds
     * @function
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    contains(point) {
        return point.x >= this.min.x && point.x <= this.max.x
               && point.y >= this.min.y && point.y <= this.max.y;
    }

    /**
     * Returns true if the two bounds intersect.
     * @name overlaps
     * @memberOf me.Bounds
     * @function
     * @param {me.Bounds} bounds
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    overlaps(bounds) {
        return (this.min.x <= bounds.max.x && this.max.x >= bounds.min.x
                && this.max.y >= bounds.min.y && this.min.y <= bounds.max.y);
    }

    /**
     * Translates the bounds by the given vector.
     * @name translate
     * @memberOf me.Bounds
     * @function
     * @param {me.Vector2d} vector
     */
    translate(vector) {
        this.min.x += vector.x;
        this.max.x += vector.x;
        this.min.y += vector.y;
        this.max.y += vector.y;
    }

    /**
     * Shifts the bounds to the given position vector.
     * @name shift
     * @memberOf me.Bounds
     * @function
     * @param {me.Vector2d} position
     */
    shift(vector) {
        var deltaX = this.max.x - this.min.x,
            deltaY = this.max.y - this.min.y;

        this.min.x = vector.x;
        this.max.x = vector.x + deltaX;
        this.min.y = vector.y;
        this.max.y = vector.y + deltaY;
    }

    /**
     * resize the bounds to the given width and height
     * @name resize
     * @memberOf me.Bounds
     * @function
     * @param {Number} width
     * @param {Number} height
     */
    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * clone this bounds
     * @name clone
     * @memberOf me.Bounds
     * @function
     * @return {me.Bounds}
     */
    clone() {
        var bounds = new Bounds();
        bounds.setMinMax(
            this.min.x,
            this.min.y,
            this.max.x,
            this.max.y
        );
        return bounds;
    }

};
export default Bounds;
