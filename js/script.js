$(document).ready(function () {
    const quizzes = [
        {
            question: '桜の名所として知られる「吉野山」がある県はどれでしょう？',
            options: ['奈良県', '山梨県', '京都府'],
            correct: 'A',
            memo: '吉野山は奈良県にあるよ'
        },
        {
            question: '「ふぐ」の養殖が盛んな県はどれでしょう？',
            options: ['福岡県', '山口県', '長崎県'],
            correct: 'B',
            memo: 'ふぐの養殖が盛んなのは、山口県だよ'
        },
        {
            question: '「松茸」の生産量が日本一と言われる県はどれでしょう？',
            options: ['長野県', '北海道', '山形県'],
            correct: 'A',
            memo: '松茸の生産量が日本一なのは、長野県なんだね！'
        },
        {
            question: '「小豆島」がある県はどれでしょう？',
            options: ['徳島県', '愛媛県', '香川県'],
            correct: 'C',
            memo: '小豆島は香川県にあるよ'
        },
        {
            question: '「カレーパン」の発祥の地と言われている県はどこでしょう？',
            options: ['大阪府', '東京都', '神奈川県'],
            correct: 'A',
            memo: '一説にカレーパンは大阪が発祥と言われているよ。'
        }
    ];

    console.log("クイズ")

    let currentQuizIndex = 0;
    let score = 0;

    function loadQuiz() {
        const quiz = quizzes[currentQuizIndex];
        $('#question').text(quiz.question);
        $('#options .option-btn').each(function (index) {
            $(this).text(quiz.options[index]);
            $(this).data('answer', String.fromCharCode(65 + index)); // A, B, C
        });
        $('#result, #result-memo, #next-btn, #result-btn').hide();
    }

    console.log("クイズ2")

    function showResult(isCorrect) {
        const quiz = quizzes[currentQuizIndex];
        $('#result').text(isCorrect ? 'せいかい！' : 'ざんねん！').show();
        $('#result-memo').text(quiz.memo).show();
        if (currentQuizIndex < quizzes.length - 1) {
            $('#next-btn').show();
        } else {
            $('#result-btn').show();
        }
    }

    console.log("答え")

    $('.start-btn').click(function () {
        $(this).hide();
        $('.quiz-container').show();
        loadQuiz();
    });


    console.log("スタートボタン")

    $('#options').on('click', '.option-btn', function () {
        const selectedAnswer = $(this).data('answer');
        const isCorrect = selectedAnswer === quizzes[currentQuizIndex].correct;
        if (isCorrect) {
            score += 20;
        }
        showResult(isCorrect);
    });


    console.log("スコア")

    $('#next-btn').click(function () {
        currentQuizIndex++;
        loadQuiz();
    });

    console.log("次へボタン")

    $('#result-btn').click(function () {
        $('.quiz-section').hide();
        $('.result-section').show();
        $('#final-score').text(`${score}点！`);
        let comment;
        if (score === 100) {
            comment = '全問正解！すごいね！';
        } else if (score >= 40) {
            comment = 'がんばったね！';
        } else {
            comment = '繰り返し問題を解くと、だんだん分かるようになるよ！もう一度やって見てね。';
        }
        $('#score-comment').text(comment);
    });
});

console.log("答え")