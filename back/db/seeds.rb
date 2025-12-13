# db/seeds.rb

User.create!

recipes = [

    # =====================
    # 15 minutes
    # =====================

    # relax - 15
    { title: "15分深呼吸に集中する", category: :relax, description: "タイマーを15分。呼吸だけに意識を向けて頭を休める。" },
    { title: "15分ストレッチで体をゆるめる", category: :relax, description: "首・肩・腰を中心に、無理のない範囲で伸ばす。" },
    { title: "15分目を閉じて休憩する", category: :relax, description: "スマホは置いて、目と脳を完全に休める。" },

    # focus - 15
    { title: "15分だけ1タスクに集中する", category: :focus, description: "やることを1つ決めて、途中で切り上げてもOK。" },
    { title: "15分で最初の一歩を書く", category: :focus, description: "今やる作業の最初の1行・1手だけ進める。" },
    { title: "15分で不要なタブを閉じる", category: :focus, description: "作業環境を整えることに集中する。" },

    # outdoor - 15
    { title: "15分だけ外の空気を吸う", category: :outdoor, description: "外に出て深呼吸。遠くまで行かなくていい。" },
    { title: "15分近所を歩く", category: :outdoor, description: "目的なしで歩くだけ。時間が来たら戻る。" },
    { title: "15分ベランダや窓際で日光を浴びる", category: :outdoor, description: "光を感じて体をリセットする。" },

    # reflect - 15
    { title: "15分で今の気分を書く", category: :reflect, description: "思っていることをそのまま書き出す。" },
    { title: "15分で今日よかったことを振り返る", category: :reflect, description: "小さなことを3つ見つける。" },
    { title: "15分で次にやることを整理する", category: :reflect, description: "次の行動を1つだけ決める。" },

    # play - 15
    { title: "15分だけ好きな音楽を聴く", category: :play, description: "1〜2曲に集中して聴く。" },
    { title: "15分だけ動画を1本見る", category: :play, description: "タイマーをセットして見終えたら終了。" },
    { title: "15分ミニゲームをする", category: :play, description: "時間が来たら必ずやめるのがルール。" },

    # =====================
    # 30 minutes
    # =====================

    # relax - 30
    { title: "30分ゆっくり休憩する", category: :relax, description: "飲み物を用意して、何もしない時間をつくる。" },
    { title: "30分仮眠をとる", category: :relax, description: "横になって目を閉じる。深く寝なくてOK。" },
    { title: "30分ストレッチと呼吸をする", category: :relax, description: "体をほぐしながらゆっくり呼吸する。" },

    # focus - 30
    { title: "30分作業を進める", category: :focus, description: "完璧を目指さず、区切りまで進める。" },
    { title: "30分資料を読む", category: :focus, description: "理解できなくてもOK。量を決めて読む。" },
    { title: "30分で作業計画を立てる", category: :focus, description: "今日・次にやることを整理する。" },

    # outdoor - 30
    { title: "30分散歩に出る", category: :outdoor, description: "近所を歩いて気分転換する。" },
    { title: "30分外でコーヒーを飲む", category: :outdoor, description: "カフェやベンチでゆっくり過ごす。" },
    { title: "30分買い物に行く", category: :outdoor, description: "必要なものだけ買って戻る。" },

    # reflect - 30
    { title: "30分で振り返りを書く", category: :reflect, description: "最近の行動と気分を整理する。" },
    { title: "30分で目標を見直す", category: :reflect, description: "今の目標が合っているか確認する。" },
    { title: "30分で不安を書き出す", category: :reflect, description: "不安を言語化して軽くする。" },

    # play - 30
    { title: "30分趣味の時間を楽しむ", category: :play, description: "ゲーム・動画・読書など1つに集中。" },
    { title: "30分だけ気になる記事を読む", category: :play, description: "途中でやめてもOK。" },
    { title: "30分ゆるくSNSを見る", category: :play, description: "時間を決めてだらだらしない。" },

    # =====================
    # 60 minutes
    # =====================

    # relax - 60
    { title: "1時間しっかり休む", category: :relax, description: "横になる・音楽を聴くなど回復を優先。" },
    { title: "1時間何もしない時間をつくる", category: :relax, description: "刺激を減らして頭を空にする。" },
    { title: "1時間ゆっくりお風呂に入る", category: :relax, description: "体を温めてリラックスする。" },

    # focus - 60
    { title: "1時間集中して作業する", category: :focus, description: "途中で他のことをしない。" },
    { title: "1時間で課題を進める", category: :focus, description: "終わらなくてもOK。前進を重視。" },
    { title: "1時間でアウトプットを書く", category: :focus, description: "学んだことをまとめる。" },

    # outdoor - 60
    { title: "1時間外出して気分転換する", category: :outdoor, description: "散歩や買い物など自由に過ごす。" },
    { title: "1時間公園や街を歩く", category: :outdoor, description: "歩くこと自体を目的にする。" },
    { title: "1時間カフェで過ごす", category: :outdoor, description: "作業しても、ぼーっとしてもOK。" },

    # reflect - 60
    { title: "1時間で振り返りと計画をする", category: :reflect, description: "これまでとこれからを整理する。" },
    { title: "1時間で自分の状態を分析する", category: :reflect, description: "最近の傾向を言語化する。" },
    { title: "1時間でノートに思考を書く", category: :reflect, description: "考えていることを自由に書く。" },

    # play - 60
    { title: "1時間趣味に没頭する", category: :play, description: "好きなことだけに時間を使う。" },
    { title: "1時間映画や動画を見る", category: :play, description: "1本だけ決めて楽しむ。" },
    { title: "1時間ゲームをする", category: :play, description: "時間が来たら必ず終了。" }
]

Recipe.insert_all!(
    recipes.map { |r| r.merge(created_at: Time.current, updated_at: Time.current) }
)

puts "Seeded: Recipes=#{recipes.size}"
