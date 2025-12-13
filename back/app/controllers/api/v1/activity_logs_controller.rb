module Api
  module V1
    class ActivityLogsController < ApplicationController
      def index
        user = User.first! # v1: 認証なし固定

        logs = user.activity_logs
                   .includes(:recipe)
                   .order(created_at: :desc)
                   .limit(limit_param)

        render json: {
          activity_logs: logs.map { |log| serialize_log(log) }
        }, status: :ok
      end

      def create
        user = User.first! # v1: 認証なし固定ユーザー

        recipe = resolve_recipe!

        log = ActivityLog.create!(
          user: user,
          recipe: recipe,
          mood: activity_log_params[:mood],
          duration_min: activity_log_params[:duration_min].to_i,
          weather: activity_log_params[:weather],
          feedback: activity_log_params[:feedback] # 任意（nilなら before_validation で normal）
        )

        render json: serialize_log(log), status: :created
      end

      private

      def limit_param
        n = params[:limit].to_i
        return 30 if n <= 0
        [n, 100].min
      end

      # 既存seedの recipe_id でログを作る or AI生成レシピを新規保存してログを作る
      def resolve_recipe!
        if activity_log_params[:recipe_id].present?
          Recipe.find(activity_log_params[:recipe_id])
        else
          Recipe.create!(
            title: activity_log_params.require(:title),
            category: activity_log_params.require(:category),
            description: activity_log_params.require(:description)
          )
        end
      end

      def activity_log_params
        params.require(:activity_log).permit(
          :recipe_id,
          :title, :category, :description,
          :mood, :duration_min, :weather, :feedback
        )
      end

      def serialize_log(log)
        {
          id: log.id,
          user_id: log.user_id,
          recipe_id: log.recipe_id,
          recipe_title: log.recipe.title,
          recipe_category: log.recipe.category,
          description: log.recipe.description,
          mood: log.mood,
          feedback: log.feedback,
          duration_min: log.duration_min,
          weather: log.weather,
          executed_at: log.created_at.iso8601
        }
      end
    end
  end
end
