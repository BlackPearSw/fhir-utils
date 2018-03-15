var ResourceHelper = require('../lib').ResourceHelper;

var should = require('chai').should();

describe('ResourceHelper', function () {
    it('should be defined', function () {
        should.exist(ResourceHelper);
    });

    it('should be implemented as a function', function () {
        should.exist(ResourceHelper);
        ResourceHelper.should.be.a('function');
    });

    describe('when instantiated', function () {

        var helper;

        beforeEach(function () {
            var options = {};
            helper = new ResourceHelper(options);
        });

        it('should return an object', function () {
            should.exist(helper);
        });

        describe('resourceTypes', function(){
            it('should be defined', function () {
                should.exist(helper.resourceTypes);
            });

            it('should be implemented as an array', function () {
                should.exist(helper.resourceTypes);
                helper.resourceTypes.should.be.an('array');
            });

            it('should contain 119 items', function () {
                helper.resourceTypes.length.should.equal(119);
            });
        });

        describe('capitalisedType', function () {
            it('should be defined', function () {
                should.exist(helper.capitalisedType);
            });

            it('should be implemented as a function', function () {
                should.exist(helper.capitalisedType);
                helper.capitalisedType.should.be.a('function');
            });

            describe('when invoked', function(){
                it('should capitalise a resource name', function(){
                    helper.capitalisedType('patient').should.equal('Patient');
                });

                it('should capitalise a resource name in Pascal case', function(){
                    helper.capitalisedType('auditevent').should.equal('AuditEvent');
                });

                it('should maintain compatibility with legacy resource types', function(){
                    helper.capitalisedType('document').should.equal('Bundle');
                });
            });
        });
    });
});