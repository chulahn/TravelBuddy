(function(angular) {
    
        angular.module('app',[])

            
    
            .controller("dataController", [ '$scope', '$http' , function ($scope, $http) {

                $scope.targetLanguages = {
                    french : {abbrev : "fr", 
                                q1:"Qu'est-ce qu'une bonne nourriture?",
                                q2:"Où se trouve un bon restaurant?",
                                q3:"Où est l'hôtel le plus proche?",
                                q4:"Où est la gare la plus proche?",
                                q5:"Quel est ton nom?",
                                q6:"À quelle distance?",
                                q7:"Combien?"},
                    german : {abbrev : "de", 
                                q1:"Was ist gutes Essen?",
                                q2:"Wo gibt es ein gutes Restaurant?",
                                q3:"Wo ist das nächstgelegene Hotel?",
                                q4:"Wo ist der nächste Bahnhof?",
                                q5:"Wie heißen Sie?",
                                q6:"Wie weit?",
                                q7:"Wie viel?"},
                    japanese : {abbrev : "ja",
                                q5:"あなたの名前は何ですか？",
                                q1:"いい食べ物は何ですか？",
                                q2:"良いレストランはどこですか？",
                                q3:"最も近いホテルはどこですか？",
                                q4:"一番近い駅はどこですか？",
                                q6:"どこまで？",
                                q7:"いくら？"}
                }




                $scope.translate = function() { 

                    // var reqTest = {
                    //     method: 'GET',
                    //     url: '/test'
                    // };

                    // $http(reqTest).then(function successCallback(response) {
                    //     console.log("success");
                    //     console.log(response);
                    // }, function errorCallback(response) {
                    //     console.log("fail");
                    // });

                    var reqPostTest = {
                        method: 'POST',
                        url: '/trans/' + $scope.target.abbrev,
                        data: {
                            "text": $scope.text
                        }
                    };

                    $http(reqPostTest).then(function successCallback(response) {
                        // console.log("success");
                        console.log(response);
                    }, function errorCallback(response) {
                        // console.log("fail");
                    });


                    // var req = {

                    //     method: 'POST',
                    //      url: 'https://translation.googleapis.com/language/translate/v2',
                    //      headers: {
                    //         'Authorization' : 'Bearer ya29.c.El-XBSsYOR6NF8mFchcfv2vOBYllYUUD89nu02Ms0U6hbiSAId9qjqTOyS0L5kQdAwmIJQDKnXPwyuksvxXe04hSVPR3Bny6rE3qDKbSw8wd1P7pqvzIF8QL0OxxB5UZCA',
                    //        'Content-Type': 'application/json'
                    //      },
                    //      data: {
                    //         'q': 'The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.',
                    //         'source': 'en',
                    //         'target': 'es',
                    //         'format': 'text'
                    //     }
                    // }

                    // $http(req).then(function successCallback(response) {
                    //     console.log("success");
                    //     console.log(response);
                    // }, function errorCallback(response) {
                    //     console.log("fail");
                    // })

                    // var xhr = new XMLHttpRequest();
                    // xhr.open('POST', 'https://translation.googleapis.com/language/translate/v2');
                    // xhr.setRequestHeader('Authorization' , 'Bearer ya29.c.El-XBSsYOR6NF8mFchcfv2vOBYllYUUD89nu02Ms0U6hbiSAId9qjqTOyS0L5kQdAwmIJQDKnXPwyuksvxXe04hSVPR3Bny6rE3qDKbSw8wd1P7pqvzIF8QL0OxxB5UZCA');
                    // xhr.setRequestHeader('Content-Type', 'application/json');
                    // xhr.send();

                };

                $scope.tts = function() {
                    var reqTest = {
                        method: 'POST',
                        url: '/tts/TEST'
                    };

                    $http(reqTest).then(function successCallback(response) {
                        console.log("success");
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log("fail");
                    });
                };
                
            }]);
    })(window.angular);
    