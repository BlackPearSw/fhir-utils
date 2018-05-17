var ResourceVisitor = require('../lib').ResourceVisitor;

var should = require('chai').should();

describe('ResourceVisitor', function () {
    it('should be defined', function () {
        should.exist(ResourceVisitor);
    });

    it('should be implemented as a function', function () {
        should.exist(ResourceVisitor);
        ResourceVisitor.should.be.a('function');
    });

    describe('when instantiated', function () {

        var visitor;

        beforeEach(function () {
            var options = {};
            visitor = new ResourceVisitor(options);
        });

        it('should return an object', function () {
            should.exist(visitor);
        });

        describe('visit', function () {
            var n, op;

            beforeEach(function () {
                n = 0;
                op = function (resource) {
                    n++;
                }
            });

            it('should be defined', function () {
                should.exist(visitor.visit);
            });

            it('should be implemented as a function', function () {
                should.exist(visitor.visit);
                visitor.visit.should.be.a('function');
            });

            describe('when invoked, should call op on each element', function(){
                it('when root undefined', function () {
                    visitor.visit(op);

                    n.should.equal(0);
                });

                it('when root not a resource', function () {
                    var element = {};

                    visitor.visit(element, op);

                    n.should.equal(0);
                });

                it('when root is a resource', function () {
                    var element = {
                        resourceType: 'Patient'
                    };

                    visitor.visit(element, op);

                    n.should.equal(1);
                });

                it('when root is a Bundle', function () {
                    var element = {
                        resourceType: 'Bundle',
                        entry: [
                            {
                                resource: {
                                    resourceType: 'Patient'
                                }
                            },
                            {
                                resource: {
                                    resourceType: 'Patient'
                                }
                            }
                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(3);
                });

                it('when root is an empty Bundle', function () {
                    var element = {
                        resourceType: 'Bundle',
                        "type": "searchset",
                        "total": 0
                    };

                    visitor.visit(element, op);

                    n.should.equal(0);
                });

                it('when root is a DSTU1 Bundle', function () {
                    var element = {
                        resourceType: 'Bundle',
                        entry: [
                            {
                                content: {
                                    resourceType: 'Patient'
                                }
                            },
                            {
                                content: {
                                    resourceType: 'Patient'
                                }
                            }
                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(3);
                });

                it('when root has contained resources', function () {
                    var element = {
                        resourceType: 'Patient',
                        contained: [
                            {
                                resourceType: 'Appointment'
                            },
                            {
                                resourceType: 'Appointment'
                            },
                            {
                                resourceType: 'Appointment'
                            }
                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(4);
                });

                it('when root is a Parameters with a value<Resource>', function () {
                    var element = {
                        resourceType: 'Parameters',
                        parameter: [
                            {
                                name: 'patientValue',
                                valuePatient: {
                                    resourceType: 'Patient'
                                }
                            }
                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(2);
                });

                it('when root is a Parameters with a resource', function () {
                    var element = {
                        resourceType: 'Parameters',
                        parameter: [
                            {
                                name: 'patientResource',
                                resource: {
                                    resourceType: 'Patient'
                                }
                            }
                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(2);
                });

                it('when root is a Parameters with parameter.part', function () {
                    var element = {
                        resourceType: 'Parameters',
                        parameter: [
                            {
                                name: 'patient',
                                part: [
                                    {
                                        valuePatient: {
                                            resourceType: 'Patient'
                                        }
                                    },
                                    {
                                        resource: {
                                            resourceType: 'Patient'
                                        }
                                    }
                                ]
                            }

                        ]
                    };

                    visitor.visit(element, op);

                    n.should.equal(3);
                });
            });
        });
    });
});