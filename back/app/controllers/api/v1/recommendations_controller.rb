module Api
  module V1
    class RecommendationsController < ApplicationController
      def create
        mood        = params.require(:mood)
        duration_min = params.require(:duration_min).to_i
        weather     = params.require(:weather)

        # v1: まずは超単純マップ（後でAIに差し替え）
        category = pick_category(mood)

        recipes = Recipe.where(category: category)
                        .order("RANDOM()")
                        .limit(3)

        # 候補が足りないときの保険（基本seedで起きない想定）
        if recipes.size < 3
          recipes = Recipe.order("RANDOM()").limit(3)
        end

        render json: {
          input: { mood: mood, duration_min: duration_min, weather: weather, category: category },
          recommendations: recipes.as_json(only: [:id, :title, :description, :category])
        }, status: :created
      end

      private

      def pick_category(mood)
        # mood は enum の文字列を想定: energetic / neutral / calm
        case mood
        when "energetic" then :outdoor
        when "neutral"   then :focus
        when "calm"      then :relax
        else :relax
        end
      end
    end
  end
end
