$(document).ready(function () {
    
    // クイズデータを定義する。（5都道府県の質問、回答、正解、コメント）
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


    //変数を初期化する。 
    let currentQuizIndex = 0;
    let score = 0;


    // クイズをロードする
    // quizzez からクイズを取り出す。
    function loadQuiz() {
        const quiz = quizzes[currentQuizIndex];
        $('#question').text(quiz.question); // 質問を表示 
        $('#options .option-btn').each(function (index) { // 選択肢を表示
            $(this).text(quiz.options[index]); // optionから選択肢を持ってくる
            $(this).data('answer', String.fromCharCode(65 + index)); // 答え合わせ用
        });
        $('#result, #result-memo, #next-btn, #result-btn').hide(); // 不要なものを非表示にする
    }

    // 結果を表示する
    function showResult(isCorrect) {
        const quiz = quizzes[currentQuizIndex];
        $('#result').text(isCorrect ? 'せいかい！' : 'ざんねん！').show(); // resultのところに結果を表示
        $('#result-memo').text(quiz.memo).show(); // 回答に関するミニコメントを表示
        if (currentQuizIndex < quizzes.length - 1){  // クイズの残り問題数を確認
            $('#next-btn').show(); // 1以上であれば、次へボタン
        } else {
            $('#result-btn').show(); // 残りがなければ、結果ボタンを表示
        }
    }



    //選択肢によってイベントを変える。正解なら20点プラスになる。 
    $('#options').on('click', '.option-btn', function () { // 選択ボタンが押された時に、
        const selectedAnswer = $(this).data('answer'); // 出した答えを見る
        const isCorrect = selectedAnswer === quizzes[currentQuizIndex].correct;
        if (isCorrect) {
            score += 20;  // 正しければ、20点加算
        }
        showResult(isCorrect); // 結果を表示する関数を呼び出す
    });



    // スタートボタン
    $('.start-btn').click(function () { // スタートボタンが押された時、
        $(this).hide(); // クリックされたボタンを隠す
        $('.quiz-container').show(); // クイズコンテイナーを表示する
        loadQuiz(); // クイズをロードする
    });



    // 次へボタン
    $('#next-btn').click(function () {
        currentQuizIndex++;
        loadQuiz();
    });

   
    // 5回目が終わったら結果ボタンを押す。
    // 点数が、満点、40点以上、それ以下で励ましコメントを変える
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

