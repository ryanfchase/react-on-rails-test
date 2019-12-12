class EpisodesController < ApplicationController
  def index
    @episodes = Episode.where(episode_params)
    render json: @episodes, each_serializer: EpisodeSerializer
  end

  private

  def episode_params
    params.permit(:course_id)
  end
end
